import { useState, ChangeEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { useStyles } from './styles/discreteSlider';
import { DiscreteSliderProps } from './types';

export default function DiscreteSlider({
  name,
  marks,
  defaultValue,
  onChangeCommited,
  track,
  className,
  ...props
}: DiscreteSliderProps) {
  const classes = useStyles();

  const [value, setValue] = useState(2);

  const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className={`${classes.root} ${className}`} {...props}>
      <Typography id='discrete-slider-custom' className={classes.sliderLabel}>
        {name}
      </Typography>
      <Slider
        track={track}
        value={value}
        min={0}
        max={4}
        step={1}
        marks={marks}
        onChange={handleChange}
        aria-labelledby='discrete-slider-custom'
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
}
