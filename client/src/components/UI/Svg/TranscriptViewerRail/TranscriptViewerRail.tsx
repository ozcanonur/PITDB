import { createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-svg-tooltip';

import { selectTranscriptViewerTranscript } from 'actions';
import { TranscriptViewerRailProps } from './types';

const RAIL_OFFSET = 153;
const RAIL_LENGTH = 494;
const RAIL_HEIGHT = 2;
const EXON_HEIGHT = 17;

const TranscriptViewerRail = ({ transcriptData, color, ...props }: TranscriptViewerRailProps) => {
  const { transcript, minimumPosition, maximumPosition } = transcriptData;
  const { transcriptId, exons } = transcript;

  const increment = RAIL_LENGTH / (maximumPosition - minimumPosition);

  const { transcript: selectedTranscript } = useSelector(
    (state: RootState) => state.selectedTranscriptViewerTranscript
  );

  const dispatch = useDispatch();
  const selectTranscriptOnClick = () => {
    dispatch(selectTranscriptViewerTranscript(transcriptId));
  };

  const ref = createRef<SVGRectElement>();

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 28' {...props}>
      <defs>
        <style>{'.transcriptViewerRail{fill:#336}.transcriptViewerExon{opacity:.7}'}</style>
      </defs>
      <g>
        <g>
          {/* This is the rail */}
          <g transform='translate(0 5)' opacity={0.5}>
            <path className='transcriptViewerRail' d='M153 9h494' />
            <rect
              className='transcriptViewerRail'
              x={RAIL_OFFSET}
              y={8}
              width={RAIL_LENGTH}
              height={RAIL_HEIGHT}
              rx={0.5}
            />
          </g>
          {/* These are the exon boxes */}
          {exons?.map(({ start, end }) => {
            const exonStartingPosition = RAIL_OFFSET + increment * (start - minimumPosition);
            const exonWidth = increment * (end - start);
            return (
              <g key={String(start + end)} className='transcriptViewerExon' transform='translate(0 5)'>
                <rect fill={color} ref={ref} x={exonStartingPosition} width={exonWidth} height={EXON_HEIGHT} rx={1} />{' '}
                <Tooltip triggerRef={ref}>
                  <g filter='drop-shadow(0 5px 10px rgba(154,160,185,.5))'>
                    <g>
                      <rect x={0.25} y={0.25} width={145} height={20.63} rx={1} fill='white' />
                      <rect x={22.38} y={5.86} width={9.4} height={9.4} rx={1} fill='#336' />
                      <text
                        transform='translate(37.31 14.96)'
                        fontSize={'1.1rem'}
                        fontFamily='Poppins, sans-serif'
                        fill='#336'
                      >
                        {`${start} - ${end}`}
                      </text>
                    </g>
                  </g>
                </Tooltip>
              </g>
            );
          })}
          <text
            transform='translate(12 18)'
            fontSize='1.1rem'
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
            <path opacity={0.1} fill='#336' d='M142.75 14l-9.89-14H0v28h132.86l9.89-14z' />
          ) : null}
        </g>
      </g>
    </svg>
  );
};

export default TranscriptViewerRail;
