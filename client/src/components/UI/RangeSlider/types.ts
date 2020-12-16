import { ChangeEvent } from 'react';

export interface RangeSliderProps {
  name: string;
  min: number;
  max: number;
  initialSmallNum: number;
  initialLargeNum: number;
  onChangeCommited: (_event: ChangeEvent<{}>, values: [number, number], sliderName: string) => void;
  className?: string;
}
