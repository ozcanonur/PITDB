import React, { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import flatten from 'flat';
import min from 'lodash/min';
import max from 'lodash/max';

import { TranscriptProps } from '../types';
import {
  getTranscriptVisualLineCount,
  getRelativePeptidePositions,
  getRelativeCdsPositionsAndSequences,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
  getRelativeModPositionsAndTypes,
} from '../DetailedTranscript/helpers';
import { useStyles } from './styles';
import { setGeneBrowserScrollJumpPosition, setGeneBrowserMouseoverScrollPosition } from 'actions';

const RAIL_LENGTH = 540;
const EXON_HEIGHT = 10;
const CDS_HEIGHT = 4;
const MUTATION_HEIGHT = 10;
const MUTATION_WIDTH = 0.5;
const MOD_WIDTH = 3;

const Transcript = memo(({ transcript, isTooltip = false, ...props }: TranscriptProps) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );

  const pixelPerValue = RAIL_LENGTH / (maximumPosition - minimumPosition + 1);

  const transcriptVisualLineCount = getTranscriptVisualLineCount(transcript);
  const exonPositions = getRelativeExonPositionsAndSequences(transcript, minimumPosition);
  const cdsPositions = getCDSStartsAndEnds(transcript, minimumPosition, maximumPosition);
  const mutationPositions = transcript.mutations.map(({ refPos }) => refPos - minimumPosition);

  const svgRef = useRef<SVGSVGElement>(null);

  const dispatch = useDispatch();

  // There are 2 px space between 'lines' hence transcriptVisualLineCount * 2
  // + CDS_HEIGHT / 2 because of mods
  const svgVerticalViewbox =
    EXON_HEIGHT +
    (transcriptVisualLineCount - 1) * CDS_HEIGHT +
    transcriptVisualLineCount * 2 +
    CDS_HEIGHT / 2;

  // Make detailed browser scroll to the clicked position instantly
  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || isTooltip) return;

    const { x: svgXOffset, width: svgWidth } = svgRef.current.getBoundingClientRect();
    const relativeClickPositionPercent = (e.clientX - svgXOffset) / svgWidth;

    const transcriptGenomeWidth = maximumPosition - minimumPosition + 1;

    const currentTranscriptPosition = Math.floor(
      minimumPosition + transcriptGenomeWidth * relativeClickPositionPercent
    );

    dispatch(setGeneBrowserScrollJumpPosition(currentTranscriptPosition));
  };

  // Change mouseover position line
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || isTooltip) return;

    const { x: svgXOffset, width: svgWidth } = svgRef.current.getBoundingClientRect();
    const relativeMouseoverPositionPercent = (e.clientX - svgXOffset) / svgWidth;

    // This is not the transcript position, rather a % value of how much offset mouseovered from the start
    dispatch(setGeneBrowserMouseoverScrollPosition(relativeMouseoverPositionPercent * 100));
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
      >
        <title>Intron</title>
      </line>
      {/* These are the exon boxes */}
      {transcript.exons.map(({ genomeStart, genomeEnd }) => {
        const exonStartingPosition = pixelPerValue * (genomeStart - minimumPosition);
        const exonWidth = pixelPerValue * (genomeEnd - genomeStart + 1);

        return (
          <rect
            key={`${genomeStart}, ${genomeEnd}`}
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

        const relativePeptidePositions = getRelativePeptidePositions(
          relativeCdsPositionsAndSequences,
          sequence,
          // @ts-ignore
          transcript.cds[index].peptides,
          isReverse
        );

        const relativeModPositionsAndTypes = getRelativeModPositionsAndTypes(
          relativeCdsPositionsAndSequences,
          relativePeptidePositions
        );

        // Need to move by 6 more if previous Cds had a peptide line
        // @ts-ignore
        const previousCdsHadPeptides = index === 0 ? false : Boolean(transcript.cds[index - 1].peptides);
        const offsetY = previousCdsHadPeptides ? index * 6 + 18 : index * 6 + 12;

        return (
          <g key={`${cdsStart}, ${cdsEnd}, ${sequence}`}>
            <line
              x1={cdsStart * pixelPerValue}
              x2={cdsStart * pixelPerValue + (cdsEnd - cdsStart + 1) * pixelPerValue}
              y1={offsetY + CDS_HEIGHT / 2}
              y2={offsetY + CDS_HEIGHT / 2}
              className={classes.cdsLine}
            >
              <title>CDS</title>
            </line>
            {relativeCdsPositionsAndSequences.map(({ start, end }, index) => (
              <rect
                key={index}
                className={classes.cdsRect}
                x={start * pixelPerValue}
                y={offsetY}
                width={(end - start + 1) * pixelPerValue}
                height={CDS_HEIGHT}
              >
                <title>CDS</title>
              </rect>
            ))}
            {/* These are the peptides */}
            {relativePeptidePositions.map(({ start, end }, index) => {
              // const startsAtCds = relativeCdsPositionsAndSequences.find((cds) => cds.start <= start);
              // let drawUntil = 0;
              // if (startsAtCds) {
              //   drawUntil = end <= startsAtCds.end ? end : startsAtCds.end;
              // }

              // return (
              //   <Fragment key={index}>
              //     <line
              //       x1={start * pixelPerValue}
              //       x2={start * pixelPerValue + (end - start + 1) * pixelPerValue}
              //       y1={CDS_HEIGHT + offsetY + 2}
              //       y2={CDS_HEIGHT + offsetY + 2}
              //       className={classes.peptideLine}
              //     >
              //       Peptide
              //     </line>
              //     {startsAtCds ? (
              //       <rect
              //         x={startsAtCds.start * pixelPerValue}
              //         y={CDS_HEIGHT + offsetY + 2}
              //         width={10}
              //         height={CDS_HEIGHT}
              //       >
              //         Peptide
              //       </rect>
              //     ) : null}
              //   </Fragment>
              // );
              return (
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
              );
            })}
            {/* These are the mods */}
            {relativeModPositionsAndTypes.map(({ pos, type }, index) => {
              const bottomLeft = `${pos * pixelPerValue - MOD_WIDTH / 2},${
                CDS_HEIGHT + offsetY + CDS_HEIGHT * 2 + CDS_HEIGHT / 2
              }`;
              const top = `${pos * pixelPerValue},${CDS_HEIGHT + offsetY + CDS_HEIGHT + CDS_HEIGHT / 2}`;
              const bottomRight = `${pos * pixelPerValue + MOD_WIDTH / 2},${
                CDS_HEIGHT + offsetY + CDS_HEIGHT * 2 + CDS_HEIGHT / 2
              }`;
              return (
                <polygon key={index} points={`${bottomLeft} ${top} ${bottomRight}`} className={classes.mod}>
                  <title>{`Mod: ${type}`}</title>
                </polygon>
              );
            })}
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
});

export default Transcript;
