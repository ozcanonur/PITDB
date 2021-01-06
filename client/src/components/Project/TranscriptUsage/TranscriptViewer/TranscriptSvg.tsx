import { createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-svg-tooltip';

import { selectTranscriptViewerTranscript, selectTranscriptViewerTranscriptColor } from 'actions';
import { TranscriptSvgProps } from './types';

const RAIL_OFFSET = 110;
const RAIL_LENGTH = 530;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;

const TranscriptSvg = ({ transcriptData, color, ...props }: TranscriptSvgProps) => {
  const { transcript, minimumPosition, maximumPosition } = transcriptData;
  const { transcriptId, exons } = transcript;

  const increment = RAIL_LENGTH / (maximumPosition - minimumPosition);

  const { transcript: selectedTranscript } = useSelector(
    (state: RootState) => state.selectedTranscriptViewerTranscript
  );

  const dispatch = useDispatch();
  const selectTranscriptOnClick = () => {
    dispatch(selectTranscriptViewerTranscript(transcriptId));
    dispatch(selectTranscriptViewerTranscriptColor(color));
  };

  const ref = createRef<SVGRectElement>();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 650 28'
      style={{ direction: 'ltr', overflow: 'clip' }}
      // preserveAspectRatio='none'
      {...props}
    >
      <g>
        {/* This is the rail */}
        <g transform='translate(0 5)'>
          <path d='M153 9h494' />
          <rect fill={color} x={RAIL_OFFSET} y={8} width={RAIL_LENGTH} height={RAIL_HEIGHT} rx={0.5} />
        </g>
        {/* These are the exon boxes */}
        {exons?.map(({ start, end }) => {
          const exonStartingPosition = RAIL_OFFSET + increment * (start - minimumPosition);
          const exonWidth = increment * (end - start + 1);
          return (
            <g key={String(start + end)} transform='translate(0 8)'>
              <rect fill={color} ref={ref} x={exonStartingPosition} width={exonWidth} height={EXON_HEIGHT} />
              <Tooltip triggerRef={ref}>
                <g filter='drop-shadow(0 5px 10px rgba(154,160,185,.5))' transform='translate(0, -5)'>
                  <rect x={0.25} y={0.25} width={100} height={16} rx={1} fill='#eceef7' />
                  <rect x={10} y={5} width={8} height={8} rx={1} fill={color} />
                  <text
                    transform='translate(25 11.4)'
                    fontSize={'0.65rem'}
                    fontFamily='Poppins, sans-serif'
                    fill='#336'
                  >
                    {`${start} - ${end}`}
                  </text>
                </g>
              </Tooltip>
            </g>
          );
        })}
        <text
          transform='translate(10 16.8)'
          fontSize='0.65rem'
          fontFamily='Poppins, sans-serif'
          color='#336'
          fill='#336'
          cursor='pointer'
          onClick={selectTranscriptOnClick}
        >
          {transcriptId}
        </text>
        {/* This is the selected transcript background */}
        {selectedTranscript === transcriptId ? (
          <rect x={0} y={4} width={100} height={20} rx={1} fill='rgba(51, 51, 102, 0.1)' />
        ) : null}
      </g>
    </svg>
  );
};

export default TranscriptSvg;
