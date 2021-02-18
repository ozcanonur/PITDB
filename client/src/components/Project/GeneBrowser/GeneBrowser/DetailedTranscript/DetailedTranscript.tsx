import React, { Fragment, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as VirtualizedList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ReactTooltip from 'react-tooltip';

import Nucleotide from './ItemRenderers/Nucleotide';
import CDS from './ItemRenderers/CDS';
import Peptide from './ItemRenderers/Peptide';
import Mod from './ItemRenderers/Mod';

import { DetailedTranscriptProps, Transcript } from '../../types';
import {
  getTranscriptVisualLineCount,
  getRelativeExonPositionsAndSequences,
  getCDSStartsAndEnds,
  getRelativeCdsPositionsAndSequences,
  getRelativePeptidePositions,
  getRelativeMutationPositionsAndTypes,
  getRelativeModPositionsAndTypes,
} from './helpers';
import { useStyles } from './styles';
import { addGeneBrowserVirtualRef, removeGeneBrowserVirtualRefsForTranscript } from 'actions';

const DetailedTranscriptLabels = ({ transcript }: { transcript: Transcript }) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  const fontSize = boxHeight === 20 ? 11.33 : 14;
  const display = boxHeight < 20 ? 'none' : 'block';
  const paddingTop = boxHeight / 4;

  return (
    <div className={classes.transcriptLabelContainer} style={{ marginTop: boxHeight }}>
      <div className={classes.transcriptNameContainer} style={{ fontSize: boxHeight === 20 ? 11.33 : 14 }}>
        <div className={classes.conditions}>
          {transcript.conditions.map(({ condition }) => {
            const { mean: meanTPM, values: TPMValues } = transcript.conditions.find(
              (e) => condition === e.condition
            ) || {
              mean: 0,
              values: [],
            };

            let tooltipText = `${condition}<br />Mean TPM: ${meanTPM.toFixed(3)}`;
            TPMValues.forEach(({ sample, TPM }) => {
              tooltipText += `<br />Sample ${sample}: ${TPM.toFixed(3)}`;
            });

            return (
              <Fragment key={condition}>
                <div
                  data-tip={tooltipText}
                  className={classes.condition}
                  style={{
                    backgroundColor: condition === conditionTypes[0] ? '#336' : '#6B88A2',
                    height: boxHeight < 20 ? 30 : boxHeight,
                  }}
                >
                  <p className={classes.conditionText} style={{ fontSize: boxHeight === 20 ? 11.33 : 14 }}>
                    {condition}
                  </p>
                </div>
                <ReactTooltip multiline place='right' />
              </Fragment>
            );
          })}
        </div>
        <p className={classes.transcriptLabelId} style={{ paddingTop: boxHeight / 4 }}>
          {transcript.transcriptId}
        </p>
      </div>
      {transcript.cds?.map(({ strand, peptides }, index) => (
        <Fragment key={index}>
          <p
            className={classes.transcriptProperty}
            style={{
              paddingTop,
              fontSize,
              height: boxHeight,
              display,
            }}
          >{`CDS, ${strand === '-' ? 'reverse' : 'forward'} strand`}</p>
          {peptides ? (
            <p
              className={classes.transcriptProperty}
              style={{
                paddingTop,
                fontSize,
                display,
                height: boxHeight,
              }}
            >
              Peptides
            </p>
          ) : null}
          {peptides && peptides.some(({ mod }) => mod.includes('(')) ? (
            <p
              className={classes.transcriptProperty}
              style={{
                paddingTop,
                fontSize,
                height: boxHeight,
                display,
              }}
            >
              Mods
            </p>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

const DetailedTranscript = memo(({ transcript, ...props }: DetailedTranscriptProps) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const relativeExonPositionsAndSequences = getRelativeExonPositionsAndSequences(transcript, minimumPosition);
  const cdsStartAndEndsAndSequences = getCDSStartsAndEnds(transcript, minimumPosition, maximumPosition);
  const relativeMutationPositionsAndTypes = getRelativeMutationPositionsAndTypes(
    transcript.mutations,
    minimumPosition
  );

  const dispatch = useDispatch();

  // Cleanup the refs on unmount
  useEffect(() => {
    return () => {
      dispatch(removeGeneBrowserVirtualRefsForTranscript(transcript.transcriptId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // WOOP, fix this
  // + BOX_HEIGHT because exon line is BOX_HEIGHT * 2, half of it is for mutation INS & DEL
  // + One more BOX_HEIGHT because mods
  const detailedTranscriptTotalHeight =
    getTranscriptVisualLineCount(transcript) * boxHeight + boxHeight + boxHeight;

  return (
    <div
      className={classes.detailedTranscriptContainer}
      style={{ alignItems: boxHeight < 20 ? 'center' : 'flex-start' }}
      {...props}
    >
      <DetailedTranscriptLabels transcript={transcript} />
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
                ref={(ref) =>
                  dispatch(addGeneBrowserVirtualRef({ id: `${transcript.transcriptId}_exon`, ref }))
                }
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

                const relativePeptidePositions = getRelativePeptidePositions(
                  relativeCdsPositionsAndSequences,
                  sequence,
                  // @ts-ignore
                  transcript.cds[index].peptides,
                  isReverse
                );

                const relativeModPositionsAndTypes = getRelativeModPositionsAndTypes(
                  relativeCdsPositionsAndSequences,
                  relativePeptidePositions
                );

                return (
                  <Fragment key={`${cdsStart}, ${cdsEnd}, ${sequence}`}>
                    <VirtualizedList
                      height={boxHeight}
                      itemCount={maximumPosition - minimumPosition + 1}
                      itemSize={boxHeight}
                      layout='horizontal'
                      width={width}
                      innerElementType='svg'
                      itemData={{ relativeCdsPositionsAndSequences, cdsStart, cdsEnd }}
                      style={{ overflow: 'hidden' }}
                      ref={(ref) =>
                        dispatch(
                          addGeneBrowserVirtualRef({ id: `${transcript.transcriptId}_cds_${index}`, ref })
                        )
                      }
                    >
                      {CDS}
                    </VirtualizedList>
                    {relativePeptidePositions.length !== 0 ? (
                      <VirtualizedList
                        height={boxHeight}
                        itemCount={maximumPosition - minimumPosition + 1}
                        itemSize={boxHeight}
                        layout='horizontal'
                        width={width}
                        innerElementType='svg'
                        itemData={{
                          relativePeptidePositions,
                          relativeCdsPositionsAndSequences,
                        }}
                        style={{ overflow: 'hidden' }}
                        ref={(ref) =>
                          dispatch(
                            addGeneBrowserVirtualRef({
                              id: `${transcript.transcriptId}_peptides_${index}`,
                              ref,
                            })
                          )
                        }
                      >
                        {Peptide}
                      </VirtualizedList>
                    ) : null}
                    {relativeModPositionsAndTypes.length !== 0 ? (
                      <VirtualizedList
                        height={boxHeight}
                        itemCount={maximumPosition - minimumPosition + 1}
                        itemSize={boxHeight}
                        layout='horizontal'
                        width={width}
                        innerElementType='svg'
                        itemData={{ relativeModPositionsAndTypes }}
                        style={{ overflow: 'hidden' }}
                        ref={(ref) =>
                          dispatch(
                            addGeneBrowserVirtualRef({
                              id: `${transcript.transcriptId}_mods_${index}`,
                              ref,
                            })
                          )
                        }
                      >
                        {Mod}
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
