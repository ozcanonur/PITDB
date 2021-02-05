import React, { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';

import { FixedSizeList as VirtualizedList } from 'react-window';
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
  getRelativeMutationPositionsAndTypes,
} from './helpers';
import { useStyles } from './styles';

const DetailedTranscript = memo((propsa: DetailedTranscriptProps) => {
  const classes = useStyles();

  const { transcriptData, refs, ...props } = propsa;

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);
  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  const { minimumPosition, maximumPosition, transcript } = transcriptData;

  const relativeExonPositionsAndSequences = getRelativeExonPositionsAndSequences(transcriptData);
  const relativeMutationPositionsAndTypes = getRelativeMutationPositionsAndTypes(transcriptData);
  const cdsStartAndEndsAndSequences = getCDSStartsAndEnds(transcriptData);

  // + BOX_HEIGHT because exon line is BOX_HEIGHT * 2, top part is for mutation INS & DEL
  const detailedTranscriptTotalHeight = getTranscriptVisualLineCount(transcript) * boxHeight + boxHeight;

  return (
    <div className={classes.detailedTranscriptContainer} {...props}>
      <div className={classes.transcriptLabelContainer} style={{ marginTop: boxHeight }}>
        <div className={classes.transcriptNameContainer}>
          <div
            className={classes.transcriptLabelCondition}
            style={{
              backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2',
              fontSize: boxHeight === 20 ? 9.33 : 14,
              height: boxHeight === 10 ? 30 : boxHeight,
              minWidth: boxHeight === 10 ? 30 : boxHeight === 40 ? 40 : boxHeight * (4 / 3),
            }}
          >
            {filters.condition}
          </div>
          <p
            className={classes.transcriptLabelId}
            style={{
              paddingTop: boxHeight / 4,
              fontSize: boxHeight === 20 ? 9.33 : 14,
            }}
          >
            {transcript.transcriptId}
          </p>
        </div>
        {transcript.cds?.map(({ strand, peptides }, index) => (
          <Fragment key={index}>
            <p
              className={classes.transcriptProperty}
              style={{
                paddingTop: boxHeight / 4,
                fontSize: boxHeight === 20 ? 9.33 : 14,
                height: boxHeight,
                display: boxHeight < 20 ? 'none' : 'block',
              }}
            >{`CDS, ${strand === '-' ? 'reverse' : 'forward'} strand`}</p>
            {peptides ? (
              <p
                className={classes.transcriptProperty}
                style={{
                  paddingTop: boxHeight / 4,
                  fontSize: boxHeight === 20 ? 9.33 : 14,
                  display: boxHeight < 20 ? 'none' : 'block',
                }}
              >
                Peptides
              </p>
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className={classes.detailedTranscript} style={{ height: detailedTranscriptTotalHeight }}>
        <AutoSizer>
          {({ width }) => (
            <>
              {/* These are the exons */}
              <VirtualizedList
                height={boxHeight * 2}
                itemCount={maximumPosition - minimumPosition + 1}
                itemSize={boxHeight}
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
                      height={boxHeight}
                      itemCount={maximumPosition - minimumPosition + 1}
                      itemSize={boxHeight}
                      layout='horizontal'
                      width={width}
                      innerElementType='svg'
                      itemData={{ relativeCdsPositionsAndSequences, cdsStart, cdsEnd }}
                      style={{ overflow: 'hidden' }}
                      ref={
                        refs.cdsRefs && refs.cdsRefs[index] && refs.cdsRefs[index].length > 0
                          ? refs.cdsRefs[index][0]
                          : undefined
                      }
                    >
                      {CDS}
                    </VirtualizedList>
                    {relativePeptidePositionsAndSequences.length > 0 ? (
                      <VirtualizedList
                        height={boxHeight}
                        itemCount={maximumPosition - minimumPosition + 1}
                        itemSize={boxHeight}
                        layout='horizontal'
                        width={width}
                        innerElementType='svg'
                        itemData={{ relativePeptidePositionsAndSequences }}
                        style={{ overflow: 'hidden' }}
                        ref={
                          refs.cdsRefs && refs.cdsRefs[index] && refs.cdsRefs[index].length > 1
                            ? refs.cdsRefs[index][1]
                            : undefined
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
});

export default DetailedTranscript;
