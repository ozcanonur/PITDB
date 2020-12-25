export interface SplicingEventsTableFilters {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
  strand: [string?, string?];
}

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

export type SplicingEventsByGeneNameResponse = {
  geneName: string;
  strand: string;
  eventType: string;
  start: string;
  end: string;
  deltaPsi: number;
  pval: number;
  pepEvidence: boolean;
}[];