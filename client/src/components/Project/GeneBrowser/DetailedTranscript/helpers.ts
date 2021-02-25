import uniqBy from 'lodash/uniqBy';
import {
  Transcript,
  RelativeMutationPositionAndType,
  RelativeCdsPositionAndSequence,
  RelativePeptidePosition,
} from '../types';

import { reverseString } from 'utils';

export const getTranscriptVisualLineCount = (transcript: Transcript) => {
  const { cds } = transcript;

  if (!cds) return 1;

  // Add cds lines and 1 more per cds line if the cds has peptides
  let totalCdssLineCount = cds.length;
  cds.forEach((e) => {
    if (e.peptides) totalCdssLineCount += 1;
  });

  return 1 + totalCdssLineCount;
};

export const getNucleotideColor = (nucleotide: string) => {
  if (nucleotide === 'A') return '#336';
  else if (nucleotide === 'C') return '#673f7e';
  else if (nucleotide === 'T') return '#6b88a2';
  else if (nucleotide === 'G') return '#2F2C38';
};

// WOOP, I have no idea, actually maybe some bit of an idea about the logic here
export const getRelativeExonPositionsAndSequences = (transcript: Transcript, minimumPosition: number) => {
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

export const getCDSStartsAndEnds = (
  transcript: Transcript,
  minimumPosition: number,
  maximumPosition: number
) => {
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

  if (isReverse) sequence = reverseString(sequence);

  for (const exon of exons) {
    if (exon.end < cdsStart) continue;

    // We are at the end
    if (exon.end > cdsEnd) {
      const cdsInThisExonLength = cdsEnd - cdsStart + 1 - (3 - (leftoverNucleotideCount || 3));

      if (cdsStart > exon.start) {
        relativeCdsPositionsAndSequences.push({
          start: cdsStart - leftoverNucleotideCount,
          end: cdsEnd,
          sequence: sequence.slice(aasProcessed, aasProcessed + Math.floor(cdsInThisExonLength / 3)),
        });
      } else {
        relativeCdsPositionsAndSequences.push({
          start: exon.start - leftoverNucleotideCount,
          end: cdsEnd,
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

// WOOP, please cleanup this mess
export const getRelativePeptidePositions = (
  relativeCdsPositionsAndSequences: RelativeCdsPositionAndSequence[],
  cdsSequence: string,
  peptides: { sequence: string; mod: string }[],
  isReverse: boolean
) => {
  // Hotfix to fix redirect from tables giving undefined peptides
  // No idea why this happens
  if (!peptides) return [];

  // Remove duplicate peptides, keep the one with the mods
  const sortedPeptides = peptides.sort(
    ({ mod: modX }, { mod: modY }) => modY.indexOf('(') - modX.indexOf('(')
  );
  const uniqPeptides = uniqBy(sortedPeptides, 'sequence');

  relativeCdsPositionsAndSequences = relativeCdsPositionsAndSequences.sort((x, y) => x.start - y.start);

  const relativePeptidePositions = uniqPeptides
    .map(({ sequence: peptideSequence, mod }) => {
      let modString = mod.replaceAll('_', '');
      const mods = modString.match(/\((.*?)\)\)/g) || [];

      const modPositions: { type: string; posInPeptide: number }[] = [];
      for (let i = 0; i < mods.length; i++) {
        // Remove previous mod from the string
        modString = modString.replace(mods[i - 1], '');
        modPositions.push({
          // Remove outer most parantheses
          type: mods[i].substring(1, mods[i].length - 1),
          posInPeptide: isReverse
            ? modString.length - modString.indexOf(mods[i]) - mods[i].length + 1
            : modString.indexOf(mods[i]),
        });
      }

      let startPos = 0;
      let endPos = 0;

      const peptideStartPosInCds = isReverse
        ? reverseString(cdsSequence).indexOf(reverseString(peptideSequence))
        : cdsSequence.indexOf(peptideSequence);
      const peptideEndPosInCds = peptideStartPosInCds + peptideSequence.length - 1;

      let coveredSoFar = 0;
      for (const cds of relativeCdsPositionsAndSequences) {
        if (startPos & endPos) break;

        // Peptide starts at this exon
        if (!startPos && peptideStartPosInCds < coveredSoFar + cds.sequence.length) {
          startPos = cds.start + (peptideStartPosInCds - coveredSoFar) * 3;
        }
        // Peptide ends at this exon
        if (!endPos && peptideEndPosInCds < coveredSoFar + cds.sequence.length) {
          endPos = cds.start + (peptideEndPosInCds - coveredSoFar + 1) * 3 - 1;
        }

        // Peptide is further down the exons
        coveredSoFar += cds.sequence.length;
      }

      return { start: startPos, end: endPos, mods: modPositions };
    })
    .sort((x, y) => x.start - y.start);

  return relativePeptidePositions;
};

// WOOP, and this mess
export const getRelativeModPositionsAndTypes = (
  relativeCdsPositionsAndSequences: RelativeCdsPositionAndSequence[],
  relativePeptidePositions: RelativePeptidePosition[]
) => {
  const relativeModPositionsAndTypes = [];
  for (const relativePeptidePosition of relativePeptidePositions) {
    const mods = relativePeptidePosition.mods;

    if (mods.length === 0) continue;

    for (const mod of mods) {
      let relativePos = relativePeptidePosition.start;
      let totalPut = 0;

      for (let i = 0; i < relativeCdsPositionsAndSequences.length; i++) {
        const currCds = relativeCdsPositionsAndSequences[i];

        if (currCds.end < relativePeptidePosition.start) continue;

        if (currCds.end > relativePos + mod.posInPeptide * 3 - totalPut) {
          relativePos += mod.posInPeptide * 3 - totalPut;
          break;
        } else {
          const nextCds = relativeCdsPositionsAndSequences[i + 1];
          totalPut = currCds.end - relativePos;
          relativePos = nextCds.start + 1;
        }
      }
      relativeModPositionsAndTypes.push({ pos: relativePos, type: mod.type });
    }
  }

  return relativeModPositionsAndTypes;
};

export const getRelativeMutationPositionsAndTypes = (
  mutations: {
    transcript: string;
    refPos: number;
    aaRef?: string;
    aaAlt?: string;
    type: string;
    ref: string;
    alt: string;
  }[],
  minimumPosition: number
) => {
  const relativeMutationPositionsAndTypes: RelativeMutationPositionAndType[] = [];

  mutations.forEach(({ refPos, type, ref, alt }) => {
    if (type === 'DEL' && ref.length > 1) {
      const splittedRef = ref.split('');
      splittedRef.forEach((nucleotide, index) => {
        relativeMutationPositionsAndTypes.push({
          start: refPos - minimumPosition + index,
          end: refPos - minimumPosition + index,
          type,
          ref: nucleotide,
          delLength: index === 0 ? splittedRef.length : undefined,
        });
      });
    } else
      relativeMutationPositionsAndTypes.push({
        start: refPos - minimumPosition,
        end: refPos - minimumPosition,
        type,
        ref,
        alt,
      });
  });

  return relativeMutationPositionsAndTypes;
};
