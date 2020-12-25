export interface MutationTableFilters {
  variantType: [string?, string?, string?];
  inCDS: [string?, string?];
  hasPeptideEvidence: [string?, string?];
  isSynonymous: [string?, string?];
}

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
  }[];
  mutationsCount: number;
};

export type GeneNamesResponse = { _id: string }[];

export type ByGeneNameResponse = {
  gene: string;
  refPos: number;
  type: string;
  ref: string;
  alt: string;
  silent: boolean;
  inCDS: string;
  hasPeptideEvidence: string;
}[];
