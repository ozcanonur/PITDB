/* eslint-disable no-loop-func */
// WOOP, I have no idea, actually maybe some bit of an idea about the logic here

import { uniqBy } from 'lodash';
import { TranscriptData } from '../types';

// Literal copypasta from Esteban's java
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
      // End of the cds
      relativeCdsPositionsAndSequences.push({
        start: exon.start,
        sequence: sequence.slice(aasProcessed, (cdsEnd - cdsStart) / 3),
      });
    } else if (cdsStart > exon.start) {
      // We are at the start
      // Intersection of the exon and the cds
      const cdsInThisExonLength = exon.end - cdsStart + 1;

      relativeCdsPositionsAndSequences.push({
        start: cdsStart,
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
        sequence: cdsSequence,
      });

      aasProcessed += Math.floor(cdsInThisExonLength / 3);

      // If we have leftover nucleotides that couldn't fit aa
      leftoverNucleotideCount = (exon.end - exon.start + 1 - (3 - (leftoverNucleotideCount || 3))) % 3;
    }
  }

  return relativeCdsPositionsAndSequences;
};

const getPeptidePosition = (
  { sequence: peptideSequence, mod }: { sequence: string; mod: string },
  cdsSequence: string,
  relativeCdsPositionsAndSequences: {
    start: number;
    sequence: string;
  }[]
) => {
  const globalStartPos = cdsSequence.indexOf(peptideSequence);
  const globalEndPos = cdsSequence.indexOf(peptideSequence) + peptideSequence.length - 1;

  mod = mod.replaceAll('_', '');
  const mods = mod.match(/\((.*?)\)\)/g) || [];

  const modPositions: { type: string; pos: number }[] = [];
  let tempMod = mod;
  for (let i = 0; i < mods.length; i++) {
    tempMod = tempMod.replace(mods[i - 1], '');
    modPositions.push({ type: mods[i], pos: tempMod.indexOf(mods[i]) });
  }

  let startPos = 0;
  let endPos = 0;
  let coveredSoFar = 0;
  for (const cds of relativeCdsPositionsAndSequences) {
    // if (startPos && endPos) break;

    // Peptide starts at this exon
    if (!startPos && globalStartPos < coveredSoFar + cds.sequence.length)
      startPos = cds.start + (globalStartPos - coveredSoFar) * 3;

    // Peptide ends at this exon
    if (!endPos && globalEndPos < coveredSoFar + cds.sequence.length)
      endPos = cds.start + (globalEndPos - coveredSoFar + 1) * 3 - 1;

    // modPositions.forEach((modPosition) => {
    //   if (modPosition.pos > coveredSoFar + cds.sequence.length) modPosition.pos += cds.sequence.length * 3;
    //   else if (modPosition.pos < coveredSoFar + cds.sequence.length) modPosition.pos = modPosition.pos * 3;
    // });

    // Peptide is further down the exons
    coveredSoFar += cds.sequence.length;
  }

  return { start: startPos, end: endPos, mods: modPositions };
};

export const getRelativePeptidePositionsAndSequences = (
  relativeCdsPositionsAndSequences: {
    start: number;
    sequence: string;
  }[],
  cdsSequence: string,
  peptides: { sequence: string; mod: string }[]
) => {
  relativeCdsPositionsAndSequences = relativeCdsPositionsAndSequences.sort((x, y) => x.start - y.start);

  peptides = uniqBy(peptides, 'mod').map(({ sequence, mod }) => ({ sequence, mod }));

  const relativePeptidePositionsAndSequences = peptides.map((peptide) =>
    getPeptidePosition(peptide, cdsSequence, relativeCdsPositionsAndSequences)
  );

  return relativePeptidePositionsAndSequences;
};
