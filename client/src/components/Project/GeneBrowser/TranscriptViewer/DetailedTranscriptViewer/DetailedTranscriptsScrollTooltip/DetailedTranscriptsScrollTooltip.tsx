import { createRef } from 'react';
import flatten from 'flat';
import { min, max } from 'lodash';

import { TranscriptSvgProps } from './types';
import { getMutationPosition } from './helpers';
import {
  getRelativePeptidePositionsAndSequences,
  getRelativeCdsPositionsAndSequences,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
} from '../DetailedTranscriptSvg/helpers';
import { useStyles } from './styles';

const RAIL_LENGTH = 540;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 1;

const DetailedTranscriptsScrollTooltip = ({ transcriptData, ...props }: TranscriptSvgProps) => {
  const classes = useStyles();

  const { transcript, minimumPosition, maximumPosition } = transcriptData;

  const pixelPerValue = RAIL_LENGTH / (maximumPosition - minimumPosition + 1);

  const minExonStart: number = min(Object.values(flatten(transcript.exons))) || 0;
  const maxExonStart: number = max(Object.values(flatten(transcript.exons))) || 0;

  const cdsPositions = getCDSStartsAndEnds(transcriptData);
  const mutationPositions = getMutationPosition(transcriptData, pixelPerValue);

  const exonRef = createRef<SVGRectElement>();
  const cdsRef = createRef<SVGRectElement>();

  const exonPositions = getRelativeExonPositionsAndSequences(transcriptData);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 540 ${26 + cdsPositions.length * 6}`}
      className={classes.svg}
      {...props}
    >
      {/* This is the rail */}
      <g transform='translate(0 5)'>
        <rect
          x={Math.floor(pixelPerValue * (minExonStart - minimumPosition + 1))}
          y={8}
          width={Math.floor(pixelPerValue * (maxExonStart - minExonStart + 1))}
          height={RAIL_HEIGHT}
          className={classes.rail}
        />
      </g>
      {/* These are the exon boxes */}
      <g transform='translate(0 8)'>
        {transcript.exons.map(({ genomeStart, genomeEnd }, index) => {
          const exonStartingPosition = Math.floor(pixelPerValue * (genomeStart - minimumPosition + 1));
          const exonWidth = Math.floor(pixelPerValue * (genomeEnd - genomeStart + 1));

          return (
            <g key={index}>
              <rect
                className={classes.exon}
                ref={exonRef}
                x={exonStartingPosition}
                width={exonWidth}
                height={EXON_HEIGHT}
              />
            </g>
          );
        })}
      </g>
      {/* These are the CDS */}
      {cdsPositions.map(({ cdsStart, cdsEnd, sequence }, index) => {
        const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
          exonPositions,
          cdsStart,
          cdsEnd,
          sequence
        );

        const relativePeptidePositionsAndSequences = getRelativePeptidePositionsAndSequences(
          relativeCdsPositionsAndSequences,
          sequence,
          // @ts-ignore
          transcript.cds[index].peptides
        );

        return (
          <g key={index} transform={`translate(0 ${20 + index * 6})`}>
            <rect
              className={classes.cds}
              x={Math.floor(cdsStart * pixelPerValue)}
              width={Math.floor((cdsEnd - cdsStart + 1) * pixelPerValue)}
              height={CDS_HEIGHT}
              ref={cdsRef}
            />
            {relativePeptidePositionsAndSequences.map(({ start, end }, index) => (
              <rect
                key={index}
                className={classes.peptide}
                x={Math.floor(pixelPerValue * start)}
                y={CDS_HEIGHT + 2}
                width={Math.floor((end - start + 1) * pixelPerValue)}
                height={CDS_HEIGHT}
              />
            ))}
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
    </svg>
  );
};

export default DetailedTranscriptsScrollTooltip;
