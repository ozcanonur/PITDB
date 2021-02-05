import { useSelector } from 'react-redux';
import { RelativeMutationPositionAndType } from '../../types';
import { useStyles } from './styles';

const DelMutation = ({ index, mutation }: { index: number; mutation: RelativeMutationPositionAndType }) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const textOffsetX = index * boxHeight + boxHeight / 2;
  const textOffsetY = boxHeight / 2 + boxHeight / 4 - boxHeight / 10 + boxHeight;

  return (
    <g className={classes.delGroup}>
      <rect fill='red' x={index * boxHeight} y={boxHeight} width={boxHeight} height={boxHeight} />
      <text x={textOffsetX} y={textOffsetY} fontSize={boxHeight / 2} className={classes.nucleotide}>
        {mutation?.ref}
      </text>
    </g>
  );
};

export default DelMutation;
