import { RelativeMutationPositionAndType } from '../../types';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

const DelMutation = ({ index, mutation }: { index: number; mutation: RelativeMutationPositionAndType }) => {
  const classes = useStyles();

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3 + BOX_HEIGHT;

  return (
    <g className={classes.delGroup}>
      <rect fill='red' x={index * BOX_HEIGHT} y={BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
        {mutation?.ref}
      </text>
    </g>
  );
};

export default DelMutation;
