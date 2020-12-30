import { Mark } from '@material-ui/core';
import { ChangeEvent, HTMLAttributes } from 'react';

export interface DiscreteSliderProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  marks: Mark[];
  defaultValue: number;
  track?: false | 'normal' | 'inverted' | undefined;
  onChangeCommited: (_event: ChangeEvent<{}>, value: number) => void;
}
