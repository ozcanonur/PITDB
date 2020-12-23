export interface SplicingEventsTableFilters {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
  strand: [string?, string?];
}

export type ConditionsData = { [conditionName: string]: number };

export type TypesData = {
  [eventType: string]: number;
};

export type EventData = {
  eventType: string;
  chr: string;
  positions: [number, number, number, number];
  direction: string;
};
