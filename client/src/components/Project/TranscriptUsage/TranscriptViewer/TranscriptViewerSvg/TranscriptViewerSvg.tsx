import { createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-svg-tooltip';

import { selectTranscriptViewerTranscript, selectTranscriptViewerTranscriptColor } from 'actions';
import { TranscriptSvgProps } from './types';
import { useStyles } from './styles';

const RAIL_OFFSET = 110;
const RAIL_LENGTH = 530;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;

const TranscriptViewerSvg = ({ transcriptData, color, ...props }: TranscriptSvgProps) => {
  const classes = useStyles();

  const { transcript, minimumPosition, maximumPosition } = transcriptData;
  const { transcriptId, exons } = transcript;

  const pixelPerValue = RAIL_LENGTH / (maximumPosition - minimumPosition + 1);

  // Currently selected transcript
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
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 650 28' className={classes.svg} {...props}>
      <text
        transform='translate(10 16.8)'
        onClick={selectTranscriptOnClick}
        className={classes.transcriptText}
      >
        {transcriptId}
      </text>
      {/* This is the selected transcript background */}
      {selectedTranscript === transcriptId ? (
        <rect x={0} y={4} width={100} height={20} rx={1} className={classes.selectedTranscriptBgRect} />
      ) : null}
      {/* This is the rail */}
      <g transform='translate(0 5)'>
        <path d='M153 9h494' />
        <rect fill={color} x={RAIL_OFFSET} y={8} width={RAIL_LENGTH} height={RAIL_HEIGHT} rx={0.5} />
      </g>
      {/* These are the exon boxes */}
      {exons?.map(({ start, end }) => {
        const exonStartingPosition = RAIL_OFFSET + pixelPerValue * (start - minimumPosition);
        const exonWidth = pixelPerValue * (end - start + 1);

        return (
          <g key={String(start + end)} transform='translate(0 8)'>
            <rect
              fill={color}
              ref={ref}
              x={exonStartingPosition}
              width={exonWidth}
              height={EXON_HEIGHT}
              className={classes.exon}
            />
            <Tooltip triggerRef={ref}>
              <g transform='translate(0, -5)'>
                <rect x={0.25} y={0.25} width={100} height={16} rx={1} fill='#eceef7' />
                <rect x={10} y={5} width={8} height={8} rx={1} fill={color} />
                <text className={classes.exonTooltipText} transform='translate(25 11.4)'>
                  {`${start} - ${end}`}
                </text>
              </g>
            </Tooltip>
          </g>
        );
      })}
    </svg>
  );
};

export default TranscriptViewerSvg;
