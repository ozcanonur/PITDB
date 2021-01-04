export type BarChartData = {
  condition: string;
  [sample: string]: number | string;
}[];

type Bars = {
  color: string;
  data: {
    id: string;
    value: number;
    index: number;
    indexValue: string;
    data: GenericObject;
  };
  height: number;
  width: number;
  key: string;
  x: number;
  y: number;
}[];

export interface PointsLayerProps {
  bars: Bars;
  xScale: any;
  yScale: any;
}

export interface ConfidenceBarChartProps {
  barChartData: BarChartData;
  axisBottomLabel: string;
  axisLeftLabel: string;
  labelFormat: string;
  min?: number;
  max?: number;
  barColor?: string[];
}
