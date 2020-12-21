export interface DGETableFilters {
  maxPValue: number;
  minAbsFoldChange: number;
  // hasPeptideEvidence: [string?, string?];
}

export type ConditionsData = {
  [conditionName: string]: {
    AF: number;
    qual: number;
  };
};

export type TypesData = {
  SNP: number;
  DEL: number;
  INS: number;
};
