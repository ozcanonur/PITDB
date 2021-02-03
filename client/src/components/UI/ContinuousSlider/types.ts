import { ChangeEvent, HTMLAttributes } from 'react';

export interface ContinuousSliderProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  min: number;
  max: number;
  initialValue: number;
  onChangeCommited: (_event: ChangeEvent<{}>, value: number) => void;
}
