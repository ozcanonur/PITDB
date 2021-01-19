// WOOP, I have no idea about the logic here

import { Transcript, TranscriptData } from '../types';

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
        // WOOP, it was also + 1 in esteban's code
        start = posOnGenome + sequenceStart - posOnTranscript;
        startSet = true;
      }
      if (posOnTranscript + exonLength > sequenceEnd) {
        // WOOP, it was also + 1 in esteban's code
        end = posOnGenome + sequenceEnd - posOnTranscript;
        break;
      }
      posOnTranscript += exonLength;
    }

    cdsPositions.push({ cdsStart: start, cdsEnd: end, sequence });
  });

  return cdsPositions;
};

export const getNucleotideColor = (nucleotide: string) => {
  let color = '#336';
  if (nucleotide === 'C') color = '#673f7e';
  else if (nucleotide === 'T') color = '#6b88a2';
  else if (nucleotide === 'G') color = '#2F2C38';

  return color;
};

export const parseExons = (transcript: Transcript) => {
  let lastExonEndedAt = 0;
  const parsedExons = transcript.exons
    .sort((x, y) => x.start - y.start)
    .map(({ start, end }) => {
      const exonLength = end - start + 1;

      const exonSequence = transcript.seq.slice(lastExonEndedAt, lastExonEndedAt + exonLength);

      lastExonEndedAt += exonLength;

      return { sequence: exonSequence, start, end, length: exonLength };
    });

  return parsedExons;
};

// WOOP, this is an actual mess, needs some refactoring
export const getRelativeCdsPositionsAndSequences = (
  exons: {
    start: number;
    end: number;
  }[],
  cdsStart: number,
  cdsEnd: number,
  sequence: string
) => {
  const hasCds = [];

  let aasProcessed = 0;
  let leftover = 0;

  for (const exon of exons) {
    if (exon.end < cdsStart) continue;

    if (exon.end > cdsEnd) {
      // End of the cds
      hasCds.push({
        start: exon.start,
        sequence: sequence.slice(aasProcessed, (cdsEnd - cdsStart) / 3),
      });
    } else if (cdsStart > exon.start) {
      // We are at the start
      // Intersection of the exon and the cds
      const cdsInThisExonLength = exon.end - cdsStart + 1;

      hasCds.push({
        start: cdsStart,
        sequence: sequence.slice(0, Math.floor(cdsInThisExonLength / 3)),
      });

      aasProcessed += Math.floor(cdsInThisExonLength / 3);

      // If we have a leftover aa
      // Skip the next aa
      leftover = cdsInThisExonLength % 3;
      if (leftover !== 0) aasProcessed += 1;
    } else {
      // We are in between exons

      // We have to skip 3 - leftover if we had ANY leftovers, otherwise don't skip
      let skip = 0;
      if (leftover) skip = 3 - leftover;

      // Intersection of the exon and the cds
      const cdsInThisExonLength = exon.end - exon.start + 1 - skip;

      // Skip remaining nucleotides if we had a aa leftover from the prev
      hasCds.push({
        start: exon.start + skip,
        sequence: sequence.slice(aasProcessed, aasProcessed + Math.floor(cdsInThisExonLength / 3)),
      });

      aasProcessed += Math.floor(cdsInThisExonLength / 3);

      leftover = cdsInThisExonLength % 3;
      // Skip the next aa if leftover
      if (leftover !== 0) aasProcessed += 1;
    }
  }

  return hasCds;
};
