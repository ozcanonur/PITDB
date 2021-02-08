export type MutationTableFilters = {
  gene: string;
  variantType: string[];
  inCDS: string[];
  hasPeptideEvidence: string[];
};

export type MutationsResponse = {
  mutations: {
    gene: string;
    refPos: number;
    type: string;
    ref: string;
    alt: string;
    silent: boolean;
    inCDS: string;
    hasPeptideEvidence: string;
    conditions: string;
  }[];
  mutationsCount: number;
};

export type GeneNamesResponse = { _id: string }[];
