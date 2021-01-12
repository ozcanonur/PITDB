import { useStyles } from './styles';
import { GenericLegendProps } from './types';

const GenericLegend = ({ items, colors, direction = 'vertical' }: GenericLegendProps) => {
  const classes = useStyles();

  return (
    <div className={classes.legend} style={{ flexDirection: direction === 'vertical' ? 'column' : 'row' }}>
      {items.map((item, index) => (
        <div key={item}>
          <div style={{ backgroundColor: colors[index] }} />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default GenericLegend;
