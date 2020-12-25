export type VolcanoPlotData = {
  data: {
    id: string;
    data: {
      x: number;
      y: number;
    }[];
  }[];
  fcMin?: number;
  fcMax?: number;
  pMax?: number;
};
