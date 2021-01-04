export type ReadCountResponse = {
  [condition: string]: {
    [sample: string]: number;
  };
};

export type BarChartData = {
  condition: string;
  [sample: string]: number | string;
}[];
