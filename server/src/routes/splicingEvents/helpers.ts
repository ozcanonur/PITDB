import { ISplicingDPSI } from '../../db/models/splicingDPSI';
import { ISplicingPsi } from '../../db/models/splicingPsi';
import { omit } from 'lodash';

export const findMongoFieldFromTableColumn = (field: string) => {
  if (field === 'Gene') return 'geneName';
  else if (field === 'Type') return 'eventType';
  else if (field === 'dPSI') return 'deltaPsi';
  else if (field === 'P Value') return 'pval';
  else if (field === 'Peptide evidence') return 'pepEvidence';
};

export const parseSplicingEvents = (splicingEvents: ISplicingDPSI[]) => {
  const parsedSplicingEvents = splicingEvents.map((splicingEvent) => {
    const { geneName, event, eventType, deltaPsi, pval, pepEvidence } = splicingEvent;

    // const formattedDeltaPsi = numeral(deltaPsi).format('0.000e+0');;
    // const formattedPVal = numeral(pval).format('0.000e+0');

    const [, , leftPositions, rightPositions] = event.split(':');
    const start = leftPositions.split('-')[1];
    const end = rightPositions.split('-')[0];

    return {
      geneName,
      strand: event.slice(-1),
      eventType,
      start,
      end,
      deltaPsi,
      pval,
      pepEvidence,
    };
  });

  return parsedSplicingEvents;
};

// Only select condition fields
export const parseConditions = (conditions: ISplicingPsi) => {
  const relevantFields = omit(conditions, ['_id', 'event', 'project']);
  // Convert Nsi/1 etc. to Nsi1
  const parsedConditions: { [conditionName: string]: number } = {};
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
