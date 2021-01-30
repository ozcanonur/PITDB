import { createRef } from 'react';
import flatten from 'flat';
import min from 'lodash/min';
import max from 'lodash/max';

import { TranscriptProps } from '../../types';
import { getMutationPosition } from './helpers';
import {
  getTranscriptVisualLineCount,
  getRelativePeptidePositionsAndSequences,
  getRelativeCdsPositionsAndSequences,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
} from '../DetailedTranscript/helpers';
import { useStyles } from './styles';

const RAIL_LENGTH = 540;
const RAIL_HEIGHT = 1;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 1;

const Transcript = ({ transcriptData, ...props }: TranscriptProps) => {
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

  const transcriptVisualLineCount = getTranscriptVisualLineCount(transcript);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 540 ${26 + (transcriptVisualLineCount - 1) * 6}`}
      className={classes.svg}
      {...props}
    >
      {/* This is the rail */}
      <g transform='translate(0 5)'>
        <rect
          x={pixelPerValue * (minExonStart - minimumPosition)}
          y={8}
          width={pixelPerValue * (maxExonStart - minExonStart)}
          height={RAIL_HEIGHT}
          className={classes.rail}
        />
      </g>
      {/* These are the exon boxes */}
      <g transform='translate(0 8)'>
        {transcript.exons.map(({ genomeStart, genomeEnd }, index) => {
          const exonStartingPosition = pixelPerValue * (genomeStart - minimumPosition);
          const exonWidth = pixelPerValue * (genomeEnd - genomeStart + 1);

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
      {cdsPositions.map(({ cdsStart, cdsEnd, sequence, isReverse }, index) => {
        const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
          exonPositions,
          cdsStart,
          cdsEnd,
          sequence,
          isReverse
        );

        // @ts-ignore
        const peptides = transcript.cds[index].peptides;

        const relativePeptidePositionsAndSequences = getRelativePeptidePositionsAndSequences(
          relativeCdsPositionsAndSequences,
          sequence,
          // @ts-ignore
          peptides
        );

        // Need to move by 6 more if previous Cds had a peptide line
        // @ts-ignore
        const previousCdsHadPeptides = index === 0 ? false : Boolean(transcript.cds[index - 1].peptides);
        const translateYAmount = previousCdsHadPeptides ? index * 6 + 6 : index * 6;

        return (
          <g key={index} transform={`translate(0 ${20 + translateYAmount})`}>
            <rect
              className={classes.cds}
              x={cdsStart * pixelPerValue}
              width={(cdsEnd - cdsStart + 1) * pixelPerValue}
              height={CDS_HEIGHT}
              ref={cdsRef}
            />
            {relativePeptidePositionsAndSequences.map(({ start, end }, index) => (
              <rect
                key={index}
                className={classes.peptide}
                x={start * pixelPerValue}
                y={CDS_HEIGHT + 2}
                width={(end - start + 1) * pixelPerValue}
                height={CDS_HEIGHT}
              />
            ))}
          </g>
        );
      })}
      {/* These are the mutations */}
      <g transform='translate(0 8)'>
        {mutationPositions.map((pos, index) => (
          <rect
            key={index}
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

export default Transcript;
