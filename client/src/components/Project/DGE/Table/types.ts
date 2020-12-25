export interface DGETableFilters {
  maxPValue: number;
  minAbsFoldChange: number;
  // hasPeptideEvidence: [string?, string?];
}

export type DGESResponse = {
  dges: {
    symbol: string;
    log2fc: number;
    padj: number;
  }[];
  dgesCount: number;
};

export type SymbolNamesResponse = { _id: string }[];

export type BySymbolNameResponse = {
  symbol: string;
  log2fc: number;
  padj: number;
}[];
