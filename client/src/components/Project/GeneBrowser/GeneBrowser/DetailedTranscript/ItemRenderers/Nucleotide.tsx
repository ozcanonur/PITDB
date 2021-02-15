import { memo } from 'react';
import { useSelector } from 'react-redux';
import max from 'lodash/max';
import min from 'lodash/min';
import { areEqual } from 'react-window';

import SnpMutation from './SnpMutation';
import InsMutation from './InsMutation';
import DelMutation from './DelMutation';

import { DetailedNucleotideProps } from '../../../types';
import { getNucleotideColor } from '../helpers';
import { useStyles } from '../styles';

const Nucleotide = memo(({ index, style, data }: DetailedNucleotideProps) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativeExonPositionsAndSequences, relativeMutationPositionsAndTypes } = data;

  // Put nothing if no exon or intron in this index at all
  const minExonStart = min(relativeExonPositionsAndSequences.map(({ start }) => start)) as number;
  const maxExonEnd = max(relativeExonPositionsAndSequences.map(({ end }) => end)) as number;
  if (index < minExonStart || index > maxExonEnd) return null;

  // Find which exon the current index belongs to
  const indexBelongsTo = relativeExonPositionsAndSequences.find(
    ({ start, end }) => index >= start && index <= end
  );

  // Only put the intron line if no exon
  if (!indexBelongsTo)
    return (
      <line
        x1={index * boxHeight}
        x2={index * boxHeight + boxHeight}
        y1={boxHeight / 2 + boxHeight}
        y2={boxHeight / 2 + boxHeight}
        strokeWidth={boxHeight / 15}
        className={classes.rail}
      />
    );

  // Find the nucleotide
  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;
  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);

  // Check if there is a mutation
  const mutation = relativeMutationPositionsAndTypes.find(({ start }) => start === index);

  const nucleotideColor = getNucleotideColor(nucleotide);

  const textOffsetX = index * boxHeight + boxHeight / 2;
  const textOffsetY = boxHeight / 2 + boxHeight / 4 - boxHeight / 10 + boxHeight;

  return (
    <g style={style}>
      {/* If there is a mutation at the current index */}
      {mutation?.type === 'SNP' ? (
        <SnpMutation index={index} mutation={mutation} />
      ) : mutation?.type === 'INS' ? (
        <InsMutation index={index} mutation={mutation} refNucleotide={nucleotide} />
      ) : mutation?.type === 'DEL' ? (
        <DelMutation index={index} mutation={mutation} />
      ) : (
        <>
          {/* If no mutation */}
          <rect
            fill={nucleotideColor}
            x={index * boxHeight}
            y={boxHeight}
            width={boxHeight}
            height={boxHeight}
          />
          {boxHeight > 5 ? (
            <text x={textOffsetX} y={textOffsetY} fontSize={boxHeight / 2} className={classes.nucleotide}>
              {nucleotide}
            </text>
          ) : null}
        </>
      )}
    </g>
  );
}, areEqual);

export default Nucleotide;
