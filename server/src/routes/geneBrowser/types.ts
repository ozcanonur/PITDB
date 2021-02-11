export type GeneBrowserFilters = {
  gene: string;
  minTPM: number;
  minQual: number;
};

export type ParsedMutation = {
  transcript: string;
  refPos: number;
  aaRef?: string;
  aaAlt?: string;
};
