import { ISplicingDPSI } from '../../db/models/splicingDPSI';
import numeral from 'numeral';

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

    const formattedDeltaPsi = numeral(deltaPsi).format('0.000e+0');
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
