import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import flatten from 'flat';
import min from 'lodash/min';
import max from 'lodash/max';

import { TranscriptProps } from '../../types';
import { getMutationPositions } from './helpers';
import {
  getTranscriptVisualLineCount,
  getRelativePeptidePositionsAndSequences,
  getRelativeCdsPositionsAndSequences,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
} from '../DetailedTranscript/helpers';
import { useStyles } from './styles';
import { setGeneBrowserScrollJumpPositionPercent } from 'actions';

const RAIL_LENGTH = 540;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 0.5;

const Transcript = ({ transcriptData, ...props }: TranscriptProps) => {
  const classes = useStyles();

  const { transcript, minimumPosition, maximumPosition } = transcriptData;

  const pixelPerValue = RAIL_LENGTH / (maximumPosition - minimumPosition + 1);

  const minExonStart: number = min(Object.values(flatten(transcript.exons))) || 0;
  const maxExonStart: number = max(Object.values(flatten(transcript.exons))) || 0;

  const cdsPositions = getCDSStartsAndEnds(transcriptData);
  const mutationPositions = getMutationPositions(transcriptData);

  const svgRef = useRef<SVGSVGElement>(null);

  const exonPositions = getRelativeExonPositionsAndSequences(transcriptData);

  const transcriptVisualLineCount = getTranscriptVisualLineCount(transcript);

  // There are 2 px space between 'lines' hence transcriptVisualLineCount * 2
  const svgVerticalViewbox =
    EXON_HEIGHT + (transcriptVisualLineCount - 1) * CDS_HEIGHT + transcriptVisualLineCount * 2;

  const dispatch = useDispatch();

  const svgOnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) return;

    const { x: svgXOffset, width: svgWidth } = svgRef.current.getBoundingClientRect();
    const relativeClickPositionPercent = (e.clientX - svgXOffset) / svgWidth;

    dispatch(setGeneBrowserScrollJumpPositionPercent(relativeClickPositionPercent));
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${RAIL_LENGTH} ${svgVerticalViewbox}`}
      className={classes.svg}
      {...props}
      onClick={svgOnClick}
      ref={svgRef}
    >
      {/* This is the rail */}
      <line
        x1={pixelPerValue * (minExonStart - minimumPosition)}
        x2={pixelPerValue * (maxExonStart - minimumPosition)}
        y1={5}
        y2={5}
        className={classes.rail}
      />
      {/* These are the exon boxes */}
      {transcript.exons.map(({ genomeStart, genomeEnd }, index) => {
        const exonStartingPosition = pixelPerValue * (genomeStart - minimumPosition);
        const exonWidth = pixelPerValue * (genomeEnd - genomeStart + 1);

        return (
          <rect
            key={index}
            className={classes.exon}
            x={exonStartingPosition}
            width={exonWidth}
            height={EXON_HEIGHT}
          >
            <title>Exon</title>
          </rect>
        );
      })}
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
        const translateYAmount = previousCdsHadPeptides ? index * 6 + 18 : index * 6 + 12;

        return (
          <g key={index}>
            <rect
              className={classes.cds}
              x={cdsStart * pixelPerValue}
              y={translateYAmount}
              width={(cdsEnd - cdsStart + 1) * pixelPerValue}
              height={CDS_HEIGHT}
            >
              <title>CDS</title>
            </rect>
            {relativePeptidePositionsAndSequences.map(({ start, end }, index) => (
              <rect
                key={index}
                className={classes.peptide}
                x={start * pixelPerValue}
                y={CDS_HEIGHT + translateYAmount + 2}
                width={(end - start + 1) * pixelPerValue}
                height={CDS_HEIGHT}
              >
                <title>Peptide</title>
              </rect>
            ))}
          </g>
        );
      })}
      {/* These are the mutations */}
      {mutationPositions.map((pos, index) => (
        <rect
          key={index}
          className={classes.mutation}
          x={pos * pixelPerValue}
          width={MUTATION_WIDTH}
          height={MUTATION_HEIGHT}
        >
          <title>Mutation</title>
        </rect>
      ))}
    </svg>
  );
};

export default Transcript;
