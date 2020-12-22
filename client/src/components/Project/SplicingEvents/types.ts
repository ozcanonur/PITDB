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
  leftPositions: [number, number];
  rightPositions: [number, number];
  direction: string;
};
