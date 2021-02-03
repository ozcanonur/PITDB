export type GeneBrowserFilters = {
  gene: string;
  condition: string;
  minTPM: number;
  minQual: number;
};

export type ParsedMutation = {
  transcript: string;
  refPos: number;
  aaRef?: string;
  aaAlt?: string;
};
