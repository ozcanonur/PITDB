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
  const parsedSplicingEvents = splicingEvents.map((splicingEvent) => {
    const { geneName, event, eventType, deltaPsi, pval, pepEvidence } = splicingEvent;

    // numeral(deltaPsi).format('0.000e+0');
    const formattedDeltaPsi = deltaPsi;
    const formattedPVal = numeral(pval).format('0.000e+0');

    return {
      geneName,
      strand: event.slice(-1),
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

export const getRegexForStrandFilter = (strandFilter: [string?, string?]) => {
  let strandQuery: any = null;
  if (strandFilter.length === 0) strandQuery = null;
  else if (strandFilter.length === 1 && strandFilter[0] === '-') strandQuery = /\-$/;
  else if (strandFilter.length === 1 && strandFilter[0] === '+') strandQuery = /\+$/;
  else strandQuery = /\-$|\+$/;

  return strandQuery;
};
