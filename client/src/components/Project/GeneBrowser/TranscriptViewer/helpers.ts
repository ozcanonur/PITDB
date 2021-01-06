import { Transcript } from './types';

export const parseDiscreteSliderMarks = (marks: string[]) =>
  marks.map((mark, index) => ({
    value: index,
    scaledValue: parseFloat(mark),
    label: mark,
  }));

export const getCDSPosition = (
  {
    transcript,
    minimumPosition,
    maximumPosition,
  }: {
    transcript: Transcript;
    minimumPosition: number;
    maximumPosition: number;
  },
  increment: number,
  railOffset: number
) => {
  let start = minimumPosition;
  let end = maximumPosition;
  let startSet = false;

  let posOnTranscript = 1;
  let posOnGenome = minimumPosition;

  const { cds, exons } = transcript;

  if (!cds || !exons) return { start: 0, end: 0 };

  const { start: sequenceStart, end: sequenceEnd } = cds;

  for (const exon of exons) {
    posOnGenome = exon.start;
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

  const width = increment * (end - start + 1);
  start = railOffset + increment * (start - minimumPosition + 1);

  return { cdsStart: start, cdsWidth: width };
};
