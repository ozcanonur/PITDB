export const parseConditions = (conditions: any) => {
  const result: { [sample: string]: { AF: number; qual: number } } = {};
  Object.keys(conditions).forEach((conditionName) => {
    const numbers = conditions[conditionName];
    Object.keys(numbers).forEach((number) => {
      result[conditionName + number] = conditions[conditionName][number];
    });
  });

  return result;
};
