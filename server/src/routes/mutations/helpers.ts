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

export const parseTypeFiltersForMongoose = (typeFilters: [string?, string?, string?]) => {
  return typeFilters.map((typeFilter) => {
    if (typeFilter === 'INS') return { ref: '' };
    if (typeFilter === 'DEL') return { alt: '' };
    if (typeFilter === 'SNP') return { $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }] };
  });
};
