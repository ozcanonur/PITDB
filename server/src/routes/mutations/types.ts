export type MutationFilters = {
  gene: string;
  variantType: [string?, string?, string?];
  inCDS: [string?, string?];
  hasPeptideEvidence: [string?, string?];
  isSynonymous: [string?, string?];
};
