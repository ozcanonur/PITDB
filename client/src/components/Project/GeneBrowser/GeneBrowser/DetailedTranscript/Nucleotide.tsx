import { memo } from 'react';
import { max, min } from 'lodash';
import { areEqual } from 'react-window';

import SnpMutation from './SnpMutation';
import InsMutation from './InsMutation';
import DelMutation from './DelMutation';

import { DetailedNucleotideProps } from '../../types';
import { getNucleotideColor } from './helpers';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

const Nucleotide = memo(({ index, style, data }: DetailedNucleotideProps) => {
  const classes = useStyles();

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
        x1={index * BOX_HEIGHT}
        x2={index * BOX_HEIGHT + BOX_HEIGHT}
        y1={BOX_HEIGHT / 2 + BOX_HEIGHT}
        y2={BOX_HEIGHT / 2 + BOX_HEIGHT}
        className={classes.rail}
      />
    );

  // Find the nucleotide
  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;
  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);

  // Check if there is a mutation
  const mutation = relativeMutationPositionsAndTypes.find(({ start }) => start === index);

  const nucleotideColor = getNucleotideColor(nucleotide);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3 + BOX_HEIGHT;

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
            x={index * BOX_HEIGHT}
            y={BOX_HEIGHT}
            width={BOX_HEIGHT}
            height={BOX_HEIGHT}
          />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {nucleotide}
          </text>
        </>
      )}
    </g>
  );
}, areEqual);

export default Nucleotide;
