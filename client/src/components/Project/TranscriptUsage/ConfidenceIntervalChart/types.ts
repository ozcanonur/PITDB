export type ConditionsByGeneNameResponse = {
  [transcript: string]: {
    [conditionName: string]: number[];
  };
};
