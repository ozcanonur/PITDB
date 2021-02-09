import { useState, ChangeEvent, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { useStyles } from './styles';
import { DiscreteSliderProps } from './types';

const DiscreteSlider = ({
  name,
  marks,
  defaultValue,
  onChangeCommited,
  track,
  className,
  ...props
}: DiscreteSliderProps) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<{}>, value: number | number[]) => {
    setValue(value as number);
  };

  return (
    <div className={`${classes.root} ${className}`} {...props}>
      <Typography id='discrete-slider' className={classes.sliderLabel}>
        {name}
      </Typography>
      <Slider
        track={track}
        min={0}
        max={marks.length - 1}
        step={1}
        marks={marks}
        value={value}
        onChange={handleChange}
        aria-labelledby='discrete-slider'
        classes={{
          root: classes.root,
          rail: classes.rail,
          valueLabel: classes.valueLabel,
          active: classes.active,
          markLabel: classes.markLabel,
        }}
        // @ts-ignore
        onChangeCommitted={onChangeCommited}
      />
    </div>
  );
};

export default DiscreteSlider;
