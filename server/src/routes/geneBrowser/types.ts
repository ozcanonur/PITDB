export type GeneBrowserFilters = {
  gene: string;
  condition: string;
  minTPM: number;
  minQual: number;
};

export type ParsedMutation = {
  transcript: string;
  pos: number;
  aaRef?: string;
  aaAlt?: string;
};
