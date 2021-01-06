import { createRef } from 'react';
import { Tooltip } from 'react-svg-tooltip';
import flatten from 'flat';
import { min, max } from 'lodash';

import { TranscriptSvgProps } from './types';
import { getCDSPosition, getMutationPosition } from './helpers';

const RAIL_OFFSET = 110;
const RAIL_LENGTH = 540;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 1;

const TranscriptSvg = ({ transcriptData, ...props }: TranscriptSvgProps) => {
  const {
    transcript: { transcriptId, exons, conditions },
    minimumPosition,
    maximumPosition,
  } = transcriptData;

  const increment = RAIL_LENGTH / (maximumPosition - minimumPosition);

  const minExonStart: number = min(Object.values(flatten(exons))) || 0;
  const maxExonStart: number = max(Object.values(flatten(exons))) || 0;

  const { cdsStart, cdsWidth } = getCDSPosition(transcriptData, increment, RAIL_OFFSET);
  const mutationPositions = getMutationPosition(transcriptData, increment, RAIL_OFFSET);

  const exonRef = createRef<SVGRectElement>();
  const cdsRef = createRef<SVGRectElement>();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 650 35'
      style={{ direction: 'ltr', overflow: 'clip' }}
      {...props}
    >
      {/* These are the condition names to the left of the transcript text */}
      <g>
        {conditions.map((condition, index) => (
          <g
            key={condition}
            filter='drop-shadow(0 5px 10px rgba(154,160,185,.5))'
            transform={`translate(${index * 17}, 4)`}
          >
            <rect
              x={0.25}
              y={0.25}
              width={15}
              height={12}
              rx={1}
              fill={['#336', '#6b88a2'][index]}
              transform='translate(0 3.5)'
            />
            <text
              transform={`translate(${-condition.length * 3 + 11.5} 12.5)`}
              fontSize={'0.65rem'}
              fontFamily='Poppins, sans-serif'
              fill='white'
            >
              {condition}
            </text>
          </g>
        ))}
        {/* This is the transcript text */}
        <text
          transform='translate(40 16)'
          fontSize='0.65rem'
          fontFamily='Poppins, sans-serif'
          color='#336'
          fill='#336'
        >
          {transcriptId}
        </text>
        {/* This is the rail */}
        <g transform='translate(0 5)'>
          <path d='M153 9h494' />
          <rect
            fill='#336'
            x={RAIL_OFFSET + increment * (minExonStart - minimumPosition + 1)}
            y={8}
            width={increment * (maxExonStart - minExonStart + 1)}
            height={RAIL_HEIGHT}
            rx={0.5}
          />
        </g>
        {/* These are the exon boxes */}
        <g transform='translate(0 8)'>
          {exons?.map(({ start, end }) => {
            const exonStartingPosition = RAIL_OFFSET + increment * (start - minimumPosition + 1);
            const exonWidth = increment * (end - start + 1);
            return (
              <g key={String(start + end)}>
                <rect
                  fill='#336'
                  ref={exonRef}
                  x={exonStartingPosition}
                  width={exonWidth}
                  height={EXON_HEIGHT}
                />
                <Tooltip triggerRef={exonRef}>
                  <g filter='drop-shadow(0 5px 10px rgba(154,160,185,.5))' transform='translate(0, -5)'>
                    <rect x={0.25} y={0.25} width={105} height={16} rx={1} fill='#eceef7' />
                    <rect x={10} y={5} width={8} height={8} rx={1} fill='#336' />
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
        </g>

        {/* This is the CDS */}
        <g transform='translate(0 20)'>
          <rect fill='#FFDE4D' x={cdsStart} width={cdsWidth} height={CDS_HEIGHT} rx={0.5} ref={cdsRef} />
          <Tooltip triggerRef={cdsRef}>
            <g filter='drop-shadow(0 5px 10px rgba(154,160,185,.5))' transform='translate(0, -5)'>
              <rect x={0.25} y={0.25} width={105} height={16} rx={1} fill='#eceef7' />
              <rect x={10} y={5} width={8} height={8} rx={1} fill='#FFDE4D' />
              <text
                transform='translate(25 11.4)'
                fontSize={'0.65rem'}
                fontFamily='Poppins, sans-serif'
                fill='#336'
              >
                CDS
              </text>
            </g>
          </Tooltip>
        </g>
        {/* These are the mutations */}
        <g transform='translate(0 8)'>
          {mutationPositions.map((pos) => (
            <rect key={pos} fill='#C8553D' x={pos} width={MUTATION_WIDTH} height={MUTATION_HEIGHT} />
          ))}
        </g>
      </g>
    </svg>
  );
};

export default TranscriptSvg;
