export interface SplicingEventsTableFilters {
  maxPValue: number;
  hasPeptideEvidence: [string?, string?];
}

export type ConditionsData = { [conditionName: string]: number };

export type TypesData = {
  [eventType: string]: number;
};
