export type ReadCountResponse = {
  [condition: string]: {
    [sample: string]: number;
  };
};

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
