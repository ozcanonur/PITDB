import { memo } from 'react';
import { max, min } from 'lodash';

import { areEqual } from 'react-window';

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

  const indexBelongsTo = relativeExonPositionsAndSequences.find(
    ({ start, end }) => index >= start && index <= end
  );

  // Only put the intron line if no exon
  if (!indexBelongsTo)
    return (
      <line
        x1={index * BOX_HEIGHT}
        x2={index * BOX_HEIGHT + BOX_HEIGHT}
        y1={BOX_HEIGHT / 2}
        y2={BOX_HEIGHT / 2}
        className={classes.rail}
      />
    );

  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;
  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);

  const mutation = relativeMutationPositionsAndTypes.find(({ pos }) => pos === index);

  const nucleotideColor = getNucleotideColor(nucleotide, mutation?.type);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

  return (
    <g style={style}>
      {mutation?.type === 'SNP' ? (
        <g className={classes.snpGroup}>
          <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {`${mutation?.ref}>${mutation?.alt}`}
          </text>
        </g>
      ) : mutation?.type === 'DEL' ? (
        <g className={classes.delGroup}>
          <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {mutation?.ref}
            {mutation.isGroupStart ? 'S' : mutation.isGroupEnd ? 'E' : ''}
          </text>
        </g>
      ) : mutation?.type === 'INS' ? (
        <>
          <rect
            fill={nucleotideColor}
            x={index * BOX_HEIGHT}
            width={BOX_HEIGHT / 2}
            height={BOX_HEIGHT}
            className={classes.insRect}
          />
          <rect
            fill={getNucleotideColor(nucleotide)}
            x={index * BOX_HEIGHT + BOX_HEIGHT / 2}
            width={BOX_HEIGHT / 2}
            height={BOX_HEIGHT}
          />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {`${mutation?.alt} ${nucleotide}`}
          </text>
        </>
      ) : (
        <>
          <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {nucleotide}
          </text>
        </>
      )}
    </g>
  );
}, areEqual);

export default Nucleotide;
