export interface DGETableFilters {
  maxPValue: number;
  minAbsFoldChange: number;
  // hasPeptideEvidence: [string?, string?];
}

export type ReadCountsData = {
  [conditionName: string]: {
    [sample: string]: number;
  };
};

export type TypesData = {
  SNP: number;
  DEL: number;
  INS: number;
};

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
