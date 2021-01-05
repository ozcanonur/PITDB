import { createRef } from 'react';
import { Tooltip } from 'react-svg-tooltip';
import flatten from 'flat';
import { min, max } from 'lodash';

import { TranscriptSvgProps } from './types';

const RAIL_OFFSET = 90;
const RAIL_LENGTH = 550;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;

const TranscriptSvg = ({ transcriptData, ...props }: TranscriptSvgProps) => {
  const { transcript, minimumPosition, maximumPosition } = transcriptData;
  const { transcriptId, exons } = transcript;

  const increment = RAIL_LENGTH / (maximumPosition - minimumPosition);

  const ref = createRef<SVGRectElement>();

  const minExonStart: number = min(Object.values(flatten(transcript.exons))) || 0;
  const maxExonStart: number = max(Object.values(flatten(transcript.exons))) || 0;

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
          <path className='transcriptViewerRail' d='M153 9h494' />
          <rect
            fill='#336'
            className='transcriptViewerRail'
            x={RAIL_OFFSET + increment * (minExonStart - minimumPosition + 1)}
            y={8}
            width={increment * (maxExonStart - minExonStart + 1)}
            height={RAIL_HEIGHT}
            rx={0.5}
          />
        </g>
        {/* These are the exon boxes */}
        {exons?.map(({ start, end }) => {
          const exonStartingPosition = RAIL_OFFSET + increment * (start - minimumPosition);
          const exonWidth = increment * (end - start + 1);
          return (
            <g key={String(start + end)} className='transcriptViewerExon' transform='translate(0 8)'>
              <rect fill='#336' ref={ref} x={exonStartingPosition} width={exonWidth} height={EXON_HEIGHT} />
              <Tooltip triggerRef={ref}>
                <g filter='drop-shadow(0 5px 10px rgba(154,160,185,.5))'>
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
        <text
          transform='translate(10 16.8)'
          fontSize='0.65rem'
          fontFamily='Poppins, sans-serif'
          color='#336'
          fill='#336'
        >
          {transcriptId}
        </text>
      </g>
    </svg>
  );
};

export default TranscriptSvg;
