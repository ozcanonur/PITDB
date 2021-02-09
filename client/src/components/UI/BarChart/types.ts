export interface BarChartProps {
  data: { [key: string]: number | string }[];
  keys: string[];
  indexBy: string;
  colors: string[];
  bottomAxisText?: string;
  leftAxisText?: string;
  width: number;
  height: number;
}
