export type PeptideIntensityResponse = {
  symbol: string;
  project: string;
  peptides: {
    [peptide: string]: {
      isGeneUnique: boolean;
      intensities: {
        FWD: {
          [condition: string]: number;
        };
        REV: {
          [condition: string]: number;
        };
      };
      sequence: string;
      ratios: {
        FWD: number;
        REV: number;
      };
    };
  } | null;
};

export type LineChartData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];
