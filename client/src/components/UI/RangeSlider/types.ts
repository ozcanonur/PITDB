import { ChangeEvent, HTMLAttributes } from 'react';

export interface RangeSliderProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  min: number;
  max: number;
  initialSmallNum: number;
  initialLargeNum: number;
  onChangeCommited: (_event: ChangeEvent<{}>, values: [number, number], sliderName: string) => void;
}
