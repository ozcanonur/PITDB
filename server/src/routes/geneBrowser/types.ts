export type GeneBrowserFilters = {
  gene: string;
  conditions: string[];
  minTPM: number;
  minQual: number;
};

export type ParsedMutation = {
  transcript: string;
  pos: number;
  aaRef?: string;
  aaAlt?: string;
};
