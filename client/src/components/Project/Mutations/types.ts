export interface MutationTableFilters {
  type: [string?, string?, string?];
  inCDS: [string?, string?];
  hasPeptideEvidence: [string?, string?];
  isSynonymous: [string?, string?];
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
