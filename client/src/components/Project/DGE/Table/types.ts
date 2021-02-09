export type DGETableFilters = {
  symbol: string;
  maxPValue: number;
  minAbsFoldChange: number;
};

export type DGESResponse = {
  dges: {
    symbol: string;
    log2fc: number;
    padj: number;
    hasPeptideIntensity: boolean;
    conditions?: string;
  }[];
  dgesCount: number;
};

export type SymbolNamesResponse = { _id: string }[];
