import { ISplicingDPSI } from '../../db/models/splicingDPSI';
import { ISplicingPsi } from '../../db/models/splicingPsi';
import { omit } from 'lodash';

export const findMongoFieldFromTableColumn = (field: string) => {
  if (field === 'Gene') return 'geneName';
  else if (field === 'Type') return 'eventType';
  else if (field === 'dPSI') return 'deltaPsi';
  else if (field === 'Adj. p value') return 'pval';
  else if (field === 'Peptide evidence') return 'pepEvidence';
};

export const parseSplicingEvents = (splicingEvents: ISplicingDPSI[]) => {
  const parsedSplicingEvents = splicingEvents.map((splicingEvent) => {
    const { geneName, event, eventType, deltaPsi, pval, pepEvidence } = splicingEvent;

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

export const parseConditions = (conditions: ISplicingPsi) => {
  const relevantFields: any = omit(conditions, ['_id', 'event', 'project']);

  const parsedConditions: { [sample: string]: number | string; condition: string }[] = [];
  for (const field of Object.keys(relevantFields)) {
    const [conditionName, sample] = field.split('/');

    const existingEntry = parsedConditions.find((entry) => entry.condition === conditionName);
    if (!existingEntry) {
      const newEntry = { condition: conditionName, [sample]: relevantFields[field] };
      parsedConditions.push(newEntry);
    } else existingEntry[sample] = relevantFields[field];
  }

  return parsedConditions;
};

// export const getRegexForStrandFilter = (strandFilter: [string?, string?]) => {
//   let strandQuery: any = null;

//   if (strandFilter.length === 0) strandQuery = null;
//   else if (strandFilter.length === 1 && strandFilter[0] === '-') strandQuery = /\-$/;
//   else if (strandFilter.length === 1 && strandFilter[0] === '+') strandQuery = /\+$/;
//   else strandQuery = /\-$|\+$/;

//   return strandQuery;
// };
