import { createRef } from 'react';
import { Tooltip } from 'react-svg-tooltip';
import flatten from 'flat';
import { min, max } from 'lodash';

import { TranscriptSvgProps } from './types';
import { getCDSPositions, getMutationPosition } from './helpers';
import { useStyles } from './styles';

const RAIL_OFFSET = 110;
const RAIL_LENGTH = 540;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 1;

const TranscriptSvg = ({ transcriptData, ...props }: TranscriptSvgProps) => {
  const classes = useStyles();

  const {
    transcript: { transcriptId, exons, conditions },
    minimumPosition,
    maximumPosition,
  } = transcriptData;

  const pixelPerValue = RAIL_LENGTH / (maximumPosition - minimumPosition + 1);

  const minExonStart: number = min(Object.values(flatten(exons))) || 0;
  const maxExonStart: number = max(Object.values(flatten(exons))) || 0;

  const cdsPositions = getCDSPositions(transcriptData, pixelPerValue, RAIL_OFFSET);
  const mutationPositions = getMutationPosition(transcriptData, pixelPerValue, RAIL_OFFSET);

  const textRef = createRef<SVGTextElement>();
  const exonRef = createRef<SVGRectElement>();
  const cdsRef = createRef<SVGRectElement>();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 650 ${26 + cdsPositions.length * 6}`}
      className={classes.svg}
      {...props}
    >
      {/* These are the condition names to the left of the transcript text */}
      <g>
        {conditions.map(({ condition, mean }, index) => (
          <g key={condition} transform={`translate(${index * 17}, 4)`} className={classes.textContainer}>
            <rect
              width={15}
              height={12}
              rx={1}
              fill={['#336', '#6b88a2'][index]}
              transform='translate(0 3.5)'
            />
            <text
              transform={`translate(${-condition.length * 3 + 11.7} 12.3)`}
              className={classes.conditionText}
              ref={textRef}
            >
              {condition}
            </text>
            <Tooltip triggerRef={textRef}>
              <g transform='translate(0, -5)'>
                <rect x={0.25} y={0.25} width={86} height={16} rx={1} fill='#eceef7' />
                <rect x={10} y={5} width={8} height={8} rx={1} fill={['#336', '#6b88a2'][index]} />
                <text className={classes.tooltipText} transform='translate(25 11.4)'>
                  {`Avg. TPM: ${mean.toFixed(4)}`}
                </text>
              </g>
            </Tooltip>
          </g>
        ))}
        {/* This is the transcript text */}
        <text className={classes.transcriptText} transform='translate(40 16)'>
          {transcriptId}
        </text>
        {/* This is the rail */}
        <g transform='translate(0 5)'>
          <rect
            x={RAIL_OFFSET + pixelPerValue * (minExonStart - minimumPosition + 1)}
            y={8}
            width={pixelPerValue * (maxExonStart - minExonStart + 1)}
            height={RAIL_HEIGHT}
            rx={0.5}
            className={classes.rail}
          />
        </g>
        {/* These are the exon boxes */}
        <g transform='translate(0 8)'>
          {exons.map(({ start, end }) => {
            const exonStartingPosition = RAIL_OFFSET + pixelPerValue * (start - minimumPosition + 1);
            const exonWidth = pixelPerValue * (end - start + 1);
            return (
              <g key={String(start + end)}>
                <rect
                  className={classes.exon}
                  ref={exonRef}
                  x={exonStartingPosition}
                  width={exonWidth}
                  height={EXON_HEIGHT}
                />
                <Tooltip triggerRef={exonRef}>
                  <g transform='translate(0, -5)'>
                    <rect x={0.25} y={0.25} width={120} height={16} rx={1} fill='#eceef7' />
                    <rect x={10} y={5} width={8} height={8} rx={1} fill='#336' />
                    <text className={classes.tooltipText} transform='translate(25 11.4)'>
                      {`Exon: ${start} - ${end}`}
                    </text>
                  </g>
                </Tooltip>
              </g>
            );
          })}
        </g>
        {/* These are the CDS */}
        {cdsPositions.map(({ cdsStart, cdsWidth }, index) => {
          // @ts-ignore
          const { start: actualStart, end: actualEnd } = transcriptData.transcript.cds[index];
          return (
            <g key={cdsStart + cdsWidth} transform={`translate(0 ${20 + index * 6})`}>
              <rect
                className={classes.cds}
                x={cdsStart}
                width={cdsWidth}
                height={CDS_HEIGHT}
                rx={0.5}
                ref={cdsRef}
              />
              <Tooltip triggerRef={cdsRef}>
                <g transform='translate(0, -5)'>
                  <rect x={0.25} y={0.25} width={85} height={16} rx={1} fill='#eceef7' />
                  <rect x={10} y={5} width={8} height={8} rx={1} fill='#FFDE4D' />
                  <text className={classes.tooltipText} transform='translate(25 11.4)'>
                    {`CDS: ${actualStart} - ${actualEnd}`}
                  </text>
                </g>
              </Tooltip>
            </g>
          );
        })}
        {/* These are the mutations */}
        <g transform='translate(0 8)'>
          {mutationPositions.map((pos) => (
            <rect
              key={pos}
              className={classes.mutation}
              x={pos}
              width={MUTATION_WIDTH}
              height={MUTATION_HEIGHT}
            />
          ))}
        </g>
      </g>
    </svg>
  );
};

export default TranscriptSvg;
