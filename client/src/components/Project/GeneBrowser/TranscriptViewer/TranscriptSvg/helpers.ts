import { TranscriptData } from '../types';

// WOOP, I have no idea about the logic here
// Literal copypasta from Esteban's java
export const getCDSPosition = (
  { transcript, minimumPosition, maximumPosition }: TranscriptData,
  pixelPerValue: number,
  railOffset: number
) => {
  let start = minimumPosition;
  let end = maximumPosition;
  let startSet = false;

  let posOnTranscript = 1;

  const { cds, exons } = transcript;

  if (!cds || !exons) return { start: 0, end: 0 };

  const { start: sequenceStart, end: sequenceEnd } = cds;

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

  const width = pixelPerValue * (end - start + 1);
  start = railOffset + pixelPerValue * (start - minimumPosition + 1);

  return { cdsStart: start, cdsWidth: width };
};

// WOOP, I have no idea about the logic here also
// Literal copypasta from above
export const getMutationPosition = (
  { transcript, minimumPosition }: TranscriptData,
  pixelPerValue: number,
  railOffset: number
) => {
  const { mutations, exons } = transcript;

  const result: number[] = [];

  mutations.forEach(({ pos }) => {
    let start = minimumPosition;
    let startSet = false;

    let posOnTranscript = 1;

    for (const exon of exons) {
      const posOnGenome = exon.start;
      const exonLength = exon.end - exon.start + 1;
      if (posOnTranscript + exonLength > pos && !startSet) {
        start = posOnGenome + pos - posOnTranscript + 1;
        startSet = true;
      }
      posOnTranscript += exonLength;
    }

    start = railOffset + pixelPerValue * (start - minimumPosition + 1);

    result.push(start);
  });

  return result;
};
