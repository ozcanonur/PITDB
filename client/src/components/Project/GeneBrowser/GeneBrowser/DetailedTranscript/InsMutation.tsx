import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { RelativeMutationPositionAndType } from '../../types';
import { getNucleotideColor } from './helpers';
import { useStyles } from './styles';

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

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { alt } = mutation;

  if (!alt) return null;

  const textOffsetX = index * boxHeight + boxHeight / 2;
  const textOffsetY = boxHeight / 2 + boxHeight / 4 - boxHeight / 10 + boxHeight;

  return (
    <>
      <g className={classes.insGroup}>
        {alt.split('').map((nucleotide, insertionIndex) => {
          const offsetX =
            index * boxHeight -
            alt.length * (boxHeight / 2) +
            (insertionIndex * boxHeight) / 2 +
            boxHeight / 2;

          return (
            <Fragment key={insertionIndex}>
              <rect className={classes.insRect} x={offsetX} width={boxHeight / 2} height={boxHeight} />
              <text
                x={offsetX + boxHeight / 4}
                y={textOffsetY - boxHeight}
                fontSize={boxHeight / 2}
                className={classes.insText}
              >
                {nucleotide}
              </text>
            </Fragment>
          );
        })}
        <rect
          className={classes.insRect}
          x={index * boxHeight}
          y={boxHeight}
          width={boxHeight / 2}
          height={boxHeight}
        />
      </g>
      <rect
        fill={getNucleotideColor(refNucleotide)}
        x={index * boxHeight + boxHeight / 2}
        y={boxHeight}
        width={boxHeight / 2}
        height={boxHeight}
      />
      <text
        x={textOffsetX + boxHeight / 4}
        y={textOffsetY}
        fontSize={boxHeight / 2}
        className={classes.nucleotide}
      >
        {refNucleotide}
      </text>
    </>
  );
};

export default InsMutation;
