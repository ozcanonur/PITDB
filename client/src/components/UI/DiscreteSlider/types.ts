import { Mark } from '@material-ui/core';
import { ChangeEvent } from 'react';

export interface DiscreteSliderProps {
  name: string;
  marks: Mark[];
  defaultValue: number;
  track?: false | 'normal' | 'inverted' | undefined;
  onChangeCommited: (_event: ChangeEvent<{}>, value: number) => void;
  className?: string;
}
