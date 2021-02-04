import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import flatten from 'flat';
import min from 'lodash/min';
import max from 'lodash/max';
import debounce from 'lodash/debounce';

import { TranscriptProps } from '../../types';
import {
  getTranscriptVisualLineCount,
  getRelativePeptidePositionsAndSequences,
  getRelativeCdsPositionsAndSequences,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
} from '../DetailedTranscript/helpers';
import { useStyles } from './styles';
import { setGeneBrowserScrollJumpPositionPercent, setGeneBrowserMouseoverScrollPosition } from 'actions';

const RAIL_LENGTH = 540;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 0.5;

const Transcript = ({ transcriptData, isTooltip = false, ...props }: TranscriptProps) => {
  const classes = useStyles();

  const { transcript, minimumPosition, maximumPosition } = transcriptData;

  const pixelPerValue = RAIL_LENGTH / (maximumPosition - minimumPosition + 1);

  const transcriptVisualLineCount = getTranscriptVisualLineCount(transcript);
  const exonPositions = getRelativeExonPositionsAndSequences(transcriptData);
  const cdsPositions = getCDSStartsAndEnds(transcriptData);
  const mutationPositions = transcriptData.transcript.mutations.map(({ refPos }) => refPos - minimumPosition);

  const svgRef = useRef<SVGSVGElement>(null);

  const dispatch = useDispatch();

  // There are 2 px space between 'lines' hence transcriptVisualLineCount * 2
  const svgVerticalViewbox =
    EXON_HEIGHT + (transcriptVisualLineCount - 1) * CDS_HEIGHT + transcriptVisualLineCount * 2;

  // Make detailed browser scroll to the clicked position instantly
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || isTooltip) return;

    const { x: svgXOffset, width: svgWidth } = svgRef.current.getBoundingClientRect();
    const relativeClickPositionPercent = (e.clientX - svgXOffset) / svgWidth;

    dispatch(setGeneBrowserScrollJumpPositionPercent(relativeClickPositionPercent));
  };

  // Change mouseover position line
  // Just debouncing it a small amount for performance
  const debounceDispatch = debounce(dispatch, 5);
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || isTooltip) return;

    const { x: svgXOffset, width: svgWidth } = svgRef.current.getBoundingClientRect();
    const relativeClickPositionPercent = (e.clientX - svgXOffset) / svgWidth;

    debounceDispatch(setGeneBrowserMouseoverScrollPosition(relativeClickPositionPercent * 100));
  };

  // Remove the position line if not hovering
  const handleMouseLeave = (_e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || isTooltip) return;

    // -1 will make it disappear
    dispatch(setGeneBrowserMouseoverScrollPosition(-1));
  };

  // For the rail
  const minExonStart: number = min(Object.values(flatten(transcript.exons))) || 0;
  const maxExonStart: number = max(Object.values(flatten(transcript.exons))) || 0;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${RAIL_LENGTH} ${svgVerticalViewbox}`}
      ref={svgRef}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ cursor: isTooltip ? 'inherit' : 'crosshair' }}
      {...props}
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

        const relativePeptidePositionsAndSequences = getRelativePeptidePositionsAndSequences(
          relativeCdsPositionsAndSequences,
          sequence,
          // @ts-ignore
          transcript.cds[index].peptides
        );

        // Need to move by 6 more if previous Cds had a peptide line
        // @ts-ignore
        const previousCdsHadPeptides = index === 0 ? false : Boolean(transcript.cds[index - 1].peptides);
        const offsetY = previousCdsHadPeptides ? index * 6 + 18 : index * 6 + 12;

        return (
          <g key={index}>
            <rect
              className={classes.cds}
              x={cdsStart * pixelPerValue}
              y={offsetY}
              width={(cdsEnd - cdsStart + 1) * pixelPerValue}
              height={CDS_HEIGHT}
            >
              <title>CDS</title>
            </rect>
            {/* These are the peptides */}
            {relativePeptidePositionsAndSequences.map(({ start, end }, index) => (
              <rect
                key={index}
                className={classes.peptide}
                x={start * pixelPerValue}
                y={CDS_HEIGHT + offsetY + 2}
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
