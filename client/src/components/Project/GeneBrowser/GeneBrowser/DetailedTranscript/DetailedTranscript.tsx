import React, { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';

import { areEqual, FixedSizeList as VirtualizedList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Nucleotide from './Nucleotide';
import CDS from './CDS';
import Peptide from './Peptide';

import { DetailedTranscriptProps } from '../../types';
import {
  getTranscriptVisualLineCount,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
  getRelativeCdsPositionsAndSequences,
  getRelativePeptidePositionsAndSequences,
  getMutationPositionsAndTypes,
  getNucleotideColor,
} from './helpers';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

// const Nucleotide2 = memo(({ index, style, data }: ListChildComponentProps) => {
//   const classes = useStyles();

//   const relativeExonPositionsAndSequences: {
//     sequence: string;
//     start: number;
//     end: number;
//     length: number;
//   }[] = data;

//   const indexBelongsTo = relativeExonPositionsAndSequences.find(
//     ({ start, end }) => index >= start && index <= end
//   );

//   if (!indexBelongsTo) return null;

//   const { sequence: exonSequence, start: exonStart } = indexBelongsTo;

//   const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);
//   const nucleotideColor = getNucleotideColor(nucleotide);

//   const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
//   const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

//   return (
//     <g style={style}>
//       <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
//       <text x={textOffsetX} y={textOffsetY} className={classes.nucleotide} fontSize={BOX_HEIGHT / 3}>
//         {index}
//       </text>
//     </g>
//   );
// }, areEqual);

const DetailedTranscript = ({ transcriptData, refs, ...props }: DetailedTranscriptProps) => {
  const classes = useStyles();

  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  const { minimumPosition, maximumPosition, transcript } = transcriptData;

  const transcriptVisualLineCount = getTranscriptVisualLineCount(transcript);
  const relativeExonPositionsAndSequences = getRelativeExonPositionsAndSequences(transcriptData);
  const cdsStartAndEndsAndSequences = getCDSStartsAndEnds(transcriptData);
  const relativeMutationPositionsAndTypes = getMutationPositionsAndTypes(transcriptData);

  return (
    <div className={classes.detailedTranscriptContainer} {...props}>
      <div className={classes.transcriptLabelContainer}>
        <div className={classes.transcriptNameContainer}>
          <div
            className={classes.transcriptLabelCondition}
            style={{ backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2' }}
          >
            {filters.condition}
          </div>
          <p className={classes.transcriptLabelId}>{transcript.transcriptId}</p>
        </div>
        {transcript.cds?.map(({ strand, peptides }, index) => (
          <Fragment key={index}>
            <p className={classes.transcriptProperty}>{`CDS, ${
              strand === '-' ? 'reverse' : 'forward'
            } strand`}</p>
            {peptides ? <p className={classes.transcriptProperty}>Peptides</p> : null}
          </Fragment>
        ))}
      </div>
      <div className={classes.detailedTranscript} style={{ height: transcriptVisualLineCount * BOX_HEIGHT }}>
        <AutoSizer>
          {({ width }) => (
            <>
              {/* This is to check indexes for accurate cds/peptide positioning */}
              {/* <VirtualizedList
                height={BOX_HEIGHT}
                itemCount={maximumPosition - minimumPosition + 1}
                itemSize={BOX_HEIGHT}
                layout='horizontal'
                width={width}
                innerElementType='svg'
                itemData={relativeExonPositionsAndSequences}
                style={{ overflow: 'hidden' }}
                // ref={refs.cdsRefs && refs.cdsRefs[0].length > 1 ? refs.cdsRefs[0][1] : undefined}
              >
                {Nucleotide2}
              </VirtualizedList> */}
              {/* These are the exons */}
              <VirtualizedList
                height={BOX_HEIGHT}
                itemCount={maximumPosition - minimumPosition + 1}
                itemSize={BOX_HEIGHT}
                layout='horizontal'
                width={width}
                innerElementType='svg'
                itemData={{ relativeExonPositionsAndSequences, relativeMutationPositionsAndTypes }}
                style={{ overflow: 'hidden' }}
                ref={refs.exonRef}
              >
                {Nucleotide}
              </VirtualizedList>
              {/* These are the CDSs */}
              {cdsStartAndEndsAndSequences.map(({ cdsStart, cdsEnd, sequence, isReverse }, index) => {
                const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
                  relativeExonPositionsAndSequences,
                  cdsStart,
                  cdsEnd,
                  sequence,
                  isReverse
                );

                const relativePeptidePositionsAndSequences = getRelativePeptidePositionsAndSequences(
                  relativeCdsPositionsAndSequences,
                  sequence,
                  // @ts-ignore
                  transcript.cds[index].peptides
                );

                return (
                  <Fragment key={index}>
                    <VirtualizedList
                      height={BOX_HEIGHT}
                      itemCount={maximumPosition - minimumPosition + 1}
                      itemSize={BOX_HEIGHT}
                      layout='horizontal'
                      width={width}
                      innerElementType='svg'
                      itemData={{ relativeCdsPositionsAndSequences, cdsStart, cdsEnd }}
                      style={{ overflow: 'hidden' }}
                      ref={
                        refs.cdsRefs && refs.cdsRefs[index].length > 0 ? refs.cdsRefs[index][0] : undefined
                      }
                    >
                      {CDS}
                    </VirtualizedList>
                    {relativePeptidePositionsAndSequences.length > 0 ? (
                      <VirtualizedList
                        height={BOX_HEIGHT}
                        itemCount={maximumPosition - minimumPosition + 1}
                        itemSize={BOX_HEIGHT}
                        layout='horizontal'
                        width={width}
                        innerElementType='svg'
                        itemData={{ relativePeptidePositionsAndSequences }}
                        style={{ overflow: 'hidden' }}
                        ref={
                          refs.cdsRefs && refs.cdsRefs[index].length > 1 ? refs.cdsRefs[index][1] : undefined
                        }
                      >
                        {Peptide}
                      </VirtualizedList>
                    ) : null}
                  </Fragment>
                );
              })}
            </>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default DetailedTranscript;
