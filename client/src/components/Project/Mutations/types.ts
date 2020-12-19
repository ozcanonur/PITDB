export interface MutationTableFilters {
  type: [string?, string?, string?];
  inCDS: [string?, string?];
  hasPeptideEvidence: [string?, string?];
}

export type FiguresData = {
  conditions: {
    [conditionName: string]: {
      AF: number;
      qual: number;
    };
  };
  types: {
    SNP: number;
    DEL: number;
    INS: number;
  };
};
