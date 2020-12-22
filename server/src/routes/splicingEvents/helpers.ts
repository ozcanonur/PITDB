import { ISplicingDPSI } from '../../db/models/splicingDPSI';
import numeral from 'numeral';
import { omit } from 'lodash';

export const convertSortFieldNameForMongoose = (field: string) => {
  if (field === 'Gene') return 'geneName';
  else if (field === 'Type') return 'eventType';
  else if (field === 'dPSI') return 'deltaPsi';
  else if (field === 'P Value') return 'pval';
  else if (field === 'Peptide evidence') return 'pepEvidence';
};

export const parseSplicingEvents = (splicingEvents: ISplicingDPSI[]) => {
  const parsedSplicingEvents = splicingEvents.map((event) => {
    const { geneName, eventType, deltaPsi, pval, pepEvidence } = event;

    // numeral(deltaPsi).format('0.000e+0');
    const formattedDeltaPsi = deltaPsi;
    const formattedPVal = numeral(pval).format('0.000e+0');

    return {
      geneName,
      eventType,
      deltaPsi: formattedDeltaPsi,
      pval: formattedPVal,
      pepEvidence,
    };
  });

  return parsedSplicingEvents;
};

// Only select condition fields
export const parseConditions = (conditions: any[]) => {
  const relevantFields = omit(conditions, ['_id', 'event', 'project']);
  // Convert Nsi/1 etc. to Nsi1
  const parsedConditions: { [field: string]: number } = {};
  for (const field of Object.keys(relevantFields)) {
    const convertedField = field.replace('/', '');
    //@ts-ignore
    parsedConditions[convertedField] = relevantFields[field];
  }

  return parsedConditions;
};
