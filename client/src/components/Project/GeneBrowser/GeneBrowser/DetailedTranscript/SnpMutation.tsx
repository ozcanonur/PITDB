import { useStyles } from './styles';

const BOX_HEIGHT = 30;

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

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3 + BOX_HEIGHT;

  return (
    <g className={classes.snpGroup}>
      <rect fill='#83502e' x={index * BOX_HEIGHT} y={BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
        {`${mutation?.ref}>${mutation?.alt}`}
      </text>
    </g>
  );
};

export default SnpMutation;
