export type SplicingEventsTableFilters = {
  gene: string;
  maxPValue: number;
  hasPeptideEvidence: string[];
};

export type SplicingEventsResponse = {
  splicingEvents: {
    geneName: string;
    strand: string;
    eventType: string;
    start: string;
    end: string;
    deltaPsi: number;
    pval: number;
    pepEvidence: boolean;
  }[];
  splicingEventsCount: number;
};

export type SplicingEventsGeneNamesResponse = { _id: string }[];
