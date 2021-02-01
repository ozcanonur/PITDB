import uniqBy from 'lodash/uniqBy';
import { Transcript, TranscriptData } from '../../types';

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

export const getNucleotideColor = (nucleotide: string, mutationType?: string) => {
  if (mutationType) {
    if (mutationType === 'DEL') return 'red';
    else if (mutationType === 'INS') return 'green';
    else if (mutationType === 'SNP') return '#83502e';
  } else {
    if (nucleotide === 'A') return '#336';
    else if (nucleotide === 'C') return '#673f7e';
    else if (nucleotide === 'T') return '#6b88a2';
    else if (nucleotide === 'G') return '#2F2C38';
  }
};

// WOOP, I have no idea, actually maybe some bit of an idea about the logic here
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

// WOOP, I have no idea about the logic here also
// Literal copypasta from above
export const getMutationPositionsAndTypes = ({ transcript, minimumPosition }: TranscriptData) => {
  const { mutations, exons } = transcript;

  const mutationPositions: { start: number; type: string; ref: string; alt: string }[] = [];

  mutations.forEach(({ pos, type, ref, alt }) => {
    let start = minimumPosition;
    let startSet = false;

    let posOnTranscript = 1;

    for (const exon of exons) {
      const posOnGenome = exon.genomeStart;
      const exonLength = exon.genomeEnd - exon.genomeStart + 1;
      if (posOnTranscript + exonLength > pos && !startSet) {
        start = posOnGenome + pos - posOnTranscript;
        startSet = true;
      }
      posOnTranscript += exonLength;
    }

    start = start - minimumPosition + 1;

    mutationPositions.push({ start, type, ref, alt });
  });

  return mutationPositions;
};

// export const getAnimationString = (
//   index: number,
//   renderedRange: { start: number; stop: number },
//   scrollDirection: 'forward' | 'backward'
// ) => {
//   const { start: renderStartIndex, stop: renderStopIndex } = renderedRange;

//   const animationName =
//     index % 4 === 0
//       ? 'slide-down'
//       : index % 4 === 1
//       ? 'slide-left'
//       : index % 4 === 2
//       ? 'slide-up'
//       : 'slide-right';
//   const animation =
//     scrollDirection === 'forward'
//       ? `${animationName} ${(index - renderStartIndex) / 100}s`
//       : `${animationName} ${(renderStopIndex - index) / 100}s`;

//   return animation;
// };
