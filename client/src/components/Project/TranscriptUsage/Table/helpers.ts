export const parseDiscreteSliderMarks = (marks: string[]) =>
  marks.map((mark, index) => ({
    value: index,
    scaledValue: parseFloat(mark),
    label: mark,
  }));

export const makeVersusConditionTypes = (conditionTypes: string[]) => {
  const versusConditionTypes = [];
  for (let i = 0; i < conditionTypes.length; i += 2) {
    versusConditionTypes.push(`${conditionTypes[i]} - ${conditionTypes[i + 1]}`);
  }

  return versusConditionTypes;
};
