import React, { Fragment } from 'react';

import { RelativeMutationPositionAndType } from '../../types';
import { getNucleotideColor } from './helpers';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

const InsMutation = ({
  index,
  mutation,
  refNucleotide,
}: {
  index: number;
  mutation: RelativeMutationPositionAndType;
  refNucleotide: string;
}) => {
  const classes = useStyles();

  const { alt } = mutation;

  if (!alt) return null;

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3 + BOX_HEIGHT;

  return (
    <>
      <g className={classes.insRect}>
        {alt.split('').map((nucleotide, insertionIndex) => {
          const offsetX =
            index * BOX_HEIGHT -
            alt.length * (BOX_HEIGHT / 2) +
            (insertionIndex * BOX_HEIGHT) / 2 +
            BOX_HEIGHT / 2;

          return (
            <Fragment key={insertionIndex}>
              <rect fill='rgba(0, 128, 0, 0.7)' x={offsetX} width={BOX_HEIGHT / 2} height={BOX_HEIGHT} />
              <text
                x={offsetX + BOX_HEIGHT / 4}
                y={textOffsetY - BOX_HEIGHT}
                fontSize={BOX_HEIGHT / 2}
                fill='white'
                textAnchor='middle'
              >
                {nucleotide}
              </text>
            </Fragment>
          );
        })}
        <rect
          fill='rgba(0, 128, 0, 0.7)'
          x={index * BOX_HEIGHT}
          y={BOX_HEIGHT}
          width={BOX_HEIGHT / 2}
          height={BOX_HEIGHT}
        />
      </g>
      <rect
        fill={getNucleotideColor(refNucleotide)}
        x={index * BOX_HEIGHT + BOX_HEIGHT / 2}
        y={BOX_HEIGHT}
        width={BOX_HEIGHT / 2}
        height={BOX_HEIGHT}
      />
      <text
        x={textOffsetX + BOX_HEIGHT / 4}
        y={textOffsetY}
        fontSize={BOX_HEIGHT / 2}
        className={classes.nucleotide}
      >
        {refNucleotide}
      </text>
    </>
  );
};

export default InsMutation;
