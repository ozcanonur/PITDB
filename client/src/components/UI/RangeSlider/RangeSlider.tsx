import React, { ChangeEvent, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { useStyles } from './styles/rangeSlider';

interface Props {
  name: string;
  min: number;
  max: number;
  initialMin?: number;
  initialMax: number;
  onChangeCommited: (_event: ChangeEvent<{}>, values: number | number[], sliderName: string) => void;
}

const RangeSlider = ({ name, min, max, initialMin = 0, initialMax, onChangeCommited }: Props) => {
  const classes = useStyles();
  const [values, setValues] = useState<number[]>([initialMin, initialMax]);

  const handleChange = (_event: ChangeEvent<{}>, values: number | number[]) => {
    setValues(values as number[]);
  };

  return (
    <div className={classes.root}>
      <Typography id='range-slider' className={classes.sliderLabel}>
        {name}
      </Typography>
      <Slider
        value={values}
        onChangeCommitted={(event, number) => onChangeCommited(event, number, name)}
        onChange={handleChange}
        valueLabelDisplay='on'
        aria-labelledby='range-slider'
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

export default RangeSlider;
