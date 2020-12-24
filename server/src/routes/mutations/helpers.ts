import { IMutation } from '../../db/models/mutation';

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

export const parseMutations = (mutations: IMutation[]) => {
  const parsedMutations = mutations.map((mutation) => {
    const { ref, gene, refPos, inCDS, alt, hasPeptideEvidence, type, silent } = mutation;

    return {
      gene,
      refPos,
      type,
      ref,
      alt,
      silent,
      inCDS: inCDS.toString(),
      hasPeptideEvidence: hasPeptideEvidence.toString(),
    };
  });

  return parsedMutations;
};

// export const parseTypeFiltersForMongoose = (typeFilters: [string?, string?, string?]) => {
//   return typeFilters.map((typeFilter) => {
//     if (typeFilter === 'INS') return { ref: '' };
//     if (typeFilter === 'DEL') return { alt: '' };
//     if (typeFilter === 'SNP') return { $and: [{ ref: { $ne: '' } }, { alt: { $ne: '' } }] };
//   });
// };

export const convertSortFieldNameForMongoose = (field: string) => {
  if (field === 'Gene') return 'gene';
  else if (field === 'Position') return 'refPos';
  else if (field === 'Ref') return 'ref';
  else if (field === 'Alt') return 'alt';
  else if (field === 'In CDS') return 'inCDS';
  else if (field === 'Peptide evidence') return 'hasPeptideEvidence';
  else if (field === 'Synonymous') return 'silent';
};
