import { useSelector } from 'react-redux';
import { useStyles } from './styles';

const SnpMutation = ({
  index,
  mutation,
}: {
  index: number;
  mutation: {
    start: number;
    end: number;
    type: string;
    ref: string;
    alt?: string;
  };
}) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const textOffsetX = index * boxHeight + boxHeight / 2;
  const textOffsetY = boxHeight / 2 + boxHeight / 4 - boxHeight / 10 + boxHeight;

  return (
    <g className={classes.snpGroup}>
      <rect fill='#83502e' x={index * boxHeight} y={boxHeight} width={boxHeight} height={boxHeight} />
      <text x={textOffsetX} y={textOffsetY} fontSize={boxHeight / 2} className={classes.nucleotide}>
        {`${mutation?.ref}>${mutation?.alt}`}
      </text>
    </g>
  );
};

export default SnpMutation;
