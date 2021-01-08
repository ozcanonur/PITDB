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

export const findMongoFieldFromTableColumn = (field: string) => {
  if (field === 'Gene') return 'gene';
  else if (field === 'Position') return 'refPos';
  else if (field === 'Ref') return 'ref';
  else if (field === 'Alt') return 'alt';
  else if (field === 'In CDS') return 'inCDS';
  else if (field === 'Peptide evidence') return 'hasPeptideEvidence';
  else if (field === 'Synonymous') return 'silent';
  else if (field === 'Type') return 'type';
};
