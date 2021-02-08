import React, { ChangeEvent, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { ContinuousSliderProps } from './types';
import { useStyles } from './styles';

const ContinuousSlider = ({
  name,
  min,
  max,
  initialValue,
  onChangeCommited,
  className,
  ...props
}: ContinuousSliderProps) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (_event: ChangeEvent<{}>, values: number | number[]) => {
    setValue(values as number);
  };

  return (
    <div className={`${classes.root} ${className}`} {...props}>
      <Typography id='continuous-slider' className={classes.sliderLabel}>
        {name}
      </Typography>
      <Slider
        value={value}
        onChangeCommitted={(event, value) => onChangeCommited(event, value as number)}
        onChange={handleChange}
        valueLabelDisplay='on'
        aria-labelledby='continuous-slider'
        valueLabelFormat={(number) => number.toLocaleString()}
        min={min}
        max={max}
        classes={{
          root: classes.root,
          rail: classes.rail,
          valueLabel: classes.valueLabel,
          active: classes.active,
        }}
      />
    </div>
  );
};

export default ContinuousSlider;
