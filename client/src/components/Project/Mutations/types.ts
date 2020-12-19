export interface MutationTableFilters {
  type: [string?, string?, string?];
  inCDS: [string?, string?];
  hasPeptideEvidence: [string?, string?];
}

export type ConditionsData = {
  [conditionName: string]: {
    AF: number;
    qual: number;
  };
};
