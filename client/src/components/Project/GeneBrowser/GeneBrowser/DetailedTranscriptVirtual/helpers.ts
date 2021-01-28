/* eslint-disable no-loop-func */
// WOOP, I have no idea, actually maybe some bit of an idea about the logic here

import { TranscriptData } from '../../types';

export const getNucleotideColor = (nucleotide: string) => {
  let color = '#336';
  if (nucleotide === 'C') color = '#673f7e';
  else if (nucleotide === 'T') color = '#6b88a2';
  else if (nucleotide === 'G') color = '#2F2C38';

  return color;
};

export const getRelativeExonPositionsAndSequences = (transcriptData: TranscriptData) => {
  const { transcript, minimumPosition } = transcriptData;

  let lastExonEndedAt = 0;
  const parsedExons = transcript.exons
    .sort((x, y) => x.genomeStart - y.genomeEnd)
    .map(({ genomeStart, genomeEnd }) => {
      const exonLength = genomeEnd - genomeStart + 1;

      const exonSequence = transcript.seq.slice(lastExonEndedAt, lastExonEndedAt + exonLength);

      lastExonEndedAt += exonLength;

      return {
        sequence: exonSequence,
        start: genomeStart - minimumPosition,
        end: genomeEnd - minimumPosition,
        length: exonLength,
      };
    });

  return parsedExons;
};

export const getCDSStartsAndEnds = ({ transcript, minimumPosition, maximumPosition }: TranscriptData) => {
  const { cds, exons } = transcript;

  if (!cds || cds.length === 0 || !exons) return [];

  const cdsPositions: { cdsStart: number; cdsEnd: number; sequence: string; isReverse: boolean }[] = [];
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
        start = posOnGenome + sequenceStart - posOnTranscript;
        startSet = true;
      }
      if (posOnTranscript + exonLength > sequenceEnd) {
        end = posOnGenome + sequenceEnd - posOnTranscript;
        break;
      }
      posOnTranscript += exonLength;
    }

    cdsPositions.push({
      cdsStart: start - minimumPosition,
      cdsEnd: end - minimumPosition,
      sequence,
      isReverse: e.strand === '-',
    });
  });

  return cdsPositions;
};

// WOOP, this is an actual mess, needs some refactoring
export const getRelativeCdsPositionsAndSequences = (
  exons: {
    start: number;
    end: number;
  }[],
  cdsStart: number,
  cdsEnd: number,
  sequence: string,
  isReverse: boolean
) => {
  let aasProcessed = 0;
  let leftoverNucleotideCount = 0;
  const relativeCdsPositionsAndSequences = [];

  if (isReverse) sequence = sequence.split('').reverse().join('');

  for (const exon of exons) {
    if (exon.end < cdsStart) continue;

    if (exon.end > cdsEnd) {
      // We are at the end
      const cdsInThisExonLength = cdsEnd - cdsStart + 1 - (3 - (leftoverNucleotideCount || 3));

      if (cdsStart > exon.start) {
        relativeCdsPositionsAndSequences.push({
          start: cdsStart - leftoverNucleotideCount,
          end: cdsEnd - (3 - (leftoverNucleotideCount || 3)),
          sequence: sequence.slice(aasProcessed, aasProcessed + Math.floor(cdsInThisExonLength / 3)),
        });
      } else {
        relativeCdsPositionsAndSequences.push({
          start: exon.start - leftoverNucleotideCount,
          end: cdsEnd - (3 - (leftoverNucleotideCount || 3)),
          sequence: sequence.slice(aasProcessed, aasProcessed + Math.floor(cdsInThisExonLength / 3)),
        });
      }

      break;
    } else if (cdsStart > exon.start) {
      // We are at the start
      // Go until
      const cdsInThisExonLength = exon.end - cdsStart + 1;

      relativeCdsPositionsAndSequences.push({
        start: cdsStart,
        end: exon.end,
        sequence: sequence.slice(0, Math.floor(cdsInThisExonLength / 3)),
      });

      aasProcessed += Math.floor(cdsInThisExonLength / 3);

      // If we have leftover nucleotides that couldn't fit aa
      leftoverNucleotideCount = cdsInThisExonLength % 3;
    } else {
      // We are in between exons
      // Add the leftover aa from the previous exon if any
      let cdsSequence = '';
      if (leftoverNucleotideCount) {
        cdsSequence += sequence.charAt(aasProcessed);
        aasProcessed += 1;
      }

      // Total space we have to put the sequence in this exon
      const cdsInThisExonLength = exon.end - exon.start + 1 - (3 - (leftoverNucleotideCount || 3));

      // Add the sequence that 'fits' in the space
      cdsSequence += sequence.slice(aasProcessed, aasProcessed + Math.floor(cdsInThisExonLength / 3));

      // Need to start from -leftover to cover the leftover from the previous exon
      relativeCdsPositionsAndSequences.push({
        start: exon.start - leftoverNucleotideCount,
        end: exon.end,
        sequence: cdsSequence,
      });

      aasProcessed += Math.floor(cdsInThisExonLength / 3);

      // If we have leftover nucleotides that couldn't fit aa
      leftoverNucleotideCount = (exon.end - exon.start + 1 - (3 - (leftoverNucleotideCount || 3))) % 3;
    }
  }

  return relativeCdsPositionsAndSequences;
};
