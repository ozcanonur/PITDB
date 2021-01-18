// WOOP, I have no idea about the logic here

import { TranscriptData } from '../types';

// Literal copypasta from Esteban's java
export const getCDSPositions = ({ transcript, minimumPosition, maximumPosition }: TranscriptData) => {
  const { cds, exons } = transcript;

  if (!cds || cds.length === 0 || !exons) return [];

  const cdsPositions: { cdsStart: number; cdsEnd: number; sequence: string }[] = [];
  cds.forEach((e) => {
    let start = minimumPosition;
    let end = maximumPosition;
    let startSet = false;

    let posOnTranscript = 1;

    const { start: sequenceStart, end: sequenceEnd, sequence } = e;

    for (const exon of exons) {
      const posOnGenome = exon.start;
      const exonLength = exon.end - exon.start + 1;
      if (posOnTranscript + exonLength > sequenceStart && !startSet) {
        start = posOnGenome + sequenceStart - posOnTranscript + 1;
        startSet = true;
      }
      if (posOnTranscript + exonLength > sequenceEnd) {
        end = posOnGenome + sequenceEnd - posOnTranscript + 1;
        break;
      }
      posOnTranscript += exonLength;
    }

    cdsPositions.push({ cdsStart: start, cdsEnd: end, sequence });
  });

  return cdsPositions;
};
