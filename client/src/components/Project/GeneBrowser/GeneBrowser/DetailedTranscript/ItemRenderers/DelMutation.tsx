import { useSelector } from 'react-redux';
import { RelativeMutationPositionAndType } from '../../../types';
import { useStyles } from '../styles';

const DelMutation = ({ index, mutation }: { index: number; mutation: RelativeMutationPositionAndType }) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const textOffsetX = index * boxHeight + boxHeight / 2;
  const textOffsetY = boxHeight / 2 + boxHeight / 4 - boxHeight / 10 + boxHeight;

  // delLength will be undefined unless this is the end point of a mutation with more than 1 nucleotide
  const { delLength, ref } = mutation;

  return (
    <g className={classes.delGroup}>
      <rect
        className={classes.delRect}
        x={index * boxHeight}
        y={boxHeight}
        width={boxHeight}
        height={boxHeight}
      />
      <text x={textOffsetX} y={textOffsetY} fontSize={boxHeight / 2} className={classes.nucleotide}>
        {ref}
      </text>
      {delLength ? (
        <line
          x1={index * boxHeight}
          x2={index * boxHeight + delLength * boxHeight}
          y1={boxHeight - boxHeight / 3}
          y2={boxHeight - boxHeight / 3}
          className={classes.delGroupLine}
        />
      ) : null}
    </g>
  );
};

export default DelMutation;
