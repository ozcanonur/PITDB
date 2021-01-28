import { TranscriptData } from '../types';

// WOOP, I have no idea about the logic here
// Literal copypasta from Esteban's java
export const getCDSPositions = (
  { transcript, minimumPosition, maximumPosition }: TranscriptData,
  pixelPerValue: number
) => {
  const { cds, exons } = transcript;

  if (!cds || cds.length === 0 || !exons) return [];

  const cdsPositions: { cdsStart: number; cdsWidth: number; cdsEnd: number; sequence: string }[] = [];
  cds.forEach((e) => {
    let start = minimumPosition;
    let end = maximumPosition;
    let startSet = false;

    let posOnTranscript = 1;

    const { start: sequenceStart, end: sequenceEnd, sequence } = e;

    for (const exon of exons) {
      const posOnGenome = exon.genomeStart;
      const exonLength = exon.genomeEnd - exon.genomeStart + 1;
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

    const width = pixelPerValue * (end - start + 1);
    start = pixelPerValue * (start - minimumPosition + 1);

    cdsPositions.push({
      cdsStart: Math.floor(start),
      cdsEnd: end - minimumPosition,
      cdsWidth: Math.floor(width),
      sequence,
    });
  });

  return cdsPositions;
};

// WOOP, I have no idea about the logic here also
// Literal copypasta from above
export const getMutationPosition = (
  { transcript, minimumPosition }: TranscriptData,
  pixelPerValue: number
) => {
  const { mutations, exons } = transcript;

  const mutationPositions: number[] = [];

  mutations.forEach(({ pos }) => {
    let start = minimumPosition;
    let startSet = false;

    let posOnTranscript = 1;

    for (const exon of exons) {
      const posOnGenome = exon.genomeStart;
      const exonLength = exon.genomeEnd - exon.genomeStart + 1;
      if (posOnTranscript + exonLength > pos && !startSet) {
        start = posOnGenome + pos - posOnTranscript + 1;
        startSet = true;
      }
      posOnTranscript += exonLength;
    }

    start = pixelPerValue * (start - minimumPosition + 1);

    mutationPositions.push(start);
  });

  return mutationPositions;
};
