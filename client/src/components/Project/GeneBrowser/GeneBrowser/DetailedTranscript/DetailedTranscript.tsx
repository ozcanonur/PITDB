import React, { memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { max, min } from 'lodash';

import { FixedSizeList as VirtualizedList, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {
  DetailedTranscriptProps,
  DetailedNucleotideProps,
  DetailedCdsProps,
  DetailedPeptideProps,
} from '../../types';
import {
  getTranscriptVisualLineCount,
  getRelativeExonPositionsAndSequences,
  getNucleotideColor,
  getCDSStartsAndEnds,
  getRelativeCdsPositionsAndSequences,
  getRelativePeptidePositionsAndSequences,
  getMutationPositionsAndTypes,
} from './helpers';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

// const Nucleotide2 = memo(({ index, style, data }: ListChildComponentProps) => {
//   const classes = useStyles();

//   const exonPositions: {
//     sequence: string;
//     start: number;
//     end: number;
//     length: number;
//   }[] = data;

//   const indexBelongsTo = exonPositions.find(({ start, end }) => index >= start && index <= end);

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

const Nucleotide = memo(({ index, style, data }: DetailedNucleotideProps) => {
  const classes = useStyles();

  const { relativeExonPositionsAndSequences, relativeMutationPositionsAndTypes } = data;

  // Put nothing if no exon or intron in this index at all
  const minExonStart = min(relativeExonPositionsAndSequences.map(({ start }) => start)) as number;
  const maxExonEnd = max(relativeExonPositionsAndSequences.map(({ end }) => end)) as number;
  if (index < minExonStart || index > maxExonEnd) return null;

  const indexBelongsTo = relativeExonPositionsAndSequences.find(
    ({ start, end }) => index >= start && index <= end
  );

  // Only put the intron line if no exon
  if (!indexBelongsTo)
    return (
      <line
        x1={index * BOX_HEIGHT}
        x2={index * BOX_HEIGHT + BOX_HEIGHT}
        y1={BOX_HEIGHT / 2}
        y2={BOX_HEIGHT / 2}
        className={classes.rail}
      />
    );

  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;
  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);

  const mutation = relativeMutationPositionsAndTypes.find(({ start }) => start === index);

  const nucleotideColor = getNucleotideColor(nucleotide, mutation?.type);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

  return (
    <g style={style}>
      {mutation?.type === 'SNP' ? (
        <g className={classes.snpGroup}>
          <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {`${mutation?.ref}>${mutation?.alt}`}
          </text>
        </g>
      ) : mutation?.type === 'DEL' ? (
        <g className={classes.delGroup}>
          <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {mutation?.ref}
          </text>
        </g>
      ) : mutation?.type === 'INS' ? (
        <>
          <rect
            fill={nucleotideColor}
            x={index * BOX_HEIGHT}
            width={BOX_HEIGHT / 2}
            height={BOX_HEIGHT}
            className={classes.insRect}
          />
          <rect
            fill={getNucleotideColor(nucleotide)}
            x={index * BOX_HEIGHT + BOX_HEIGHT / 2}
            width={BOX_HEIGHT / 2}
            height={BOX_HEIGHT}
          />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {`${mutation?.alt} ${nucleotide}`}
          </text>
        </>
      ) : (
        <>
          <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
            {nucleotide}
          </text>
        </>
      )}
    </g>
  );
}, areEqual);

const CDS = memo(({ index, style, data }: DetailedCdsProps) => {
  const classes = useStyles();

  const { relativeCdsPositionsAndSequences, cdsStart, cdsEnd } = data;

  // Put nothing if no cds in this box at all
  const isCds = index >= cdsStart && index <= cdsEnd;
  if (!isCds) return null;

  const indexBelongsTo = relativeCdsPositionsAndSequences.find(
    ({ start, end }) => index >= start && index <= end
  );

  // Only put yellow box if CDS exists but no aminoacid
  if (!indexBelongsTo)
    return (
      <g style={style}>
        <rect
          className={classes.cdsBackground}
          x={index * BOX_HEIGHT}
          width={BOX_HEIGHT}
          height={BOX_HEIGHT}
        />
      </g>
    );

  const { start, sequence } = indexBelongsTo;

  const aminoacid = sequence.slice((index - start - 1) / 3, (index - start - 1) / 3 + 1);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  // -3 because it looks better
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

  return (
    <g style={style}>
      <rect className={classes.cdsBackground} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      {/* +0.5 because it looks better */}
      {(index - start) % 3 === 0 ? (
        <line
          x1={index * BOX_HEIGHT + 0.5}
          x2={index * BOX_HEIGHT + 0.5}
          y1={0}
          y2={BOX_HEIGHT}
          className={classes.divider}
        />
      ) : (index - start) % 3 === 1 ? (
        <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.aminoacid}>
          {aminoacid}
        </text>
      ) : null}
    </g>
  );
}, areEqual);

const Peptide = memo(({ index, style, data }: DetailedPeptideProps) => {
  const classes = useStyles();

  const { relativePeptidePositionsAndSequences } = data;

  const indexBelongsTo = relativePeptidePositionsAndSequences.filter(
    ({ start, end }) => index >= start && index <= end
  );

  // Put nothing if no peptide in this index at all
  if (!indexBelongsTo) return null;

  return (
    <g style={style}>
      {indexBelongsTo.map(({ start, end }, iterateIndex) => (
        <Fragment key={iterateIndex}>
          <rect className={classes.peptide} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          {index === start || index === end + 1 ? (
            <line
              className={classes.divider}
              x1={index * BOX_HEIGHT + 0.5}
              x2={index * BOX_HEIGHT + 0.5}
              y1={0}
              y2={BOX_HEIGHT}
            />
          ) : null}
        </Fragment>
      ))}
    </g>
  );
}, areEqual);

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
                itemData={exonPositions}
                className={classes.virtualizedList}
                ref={refs.exonLineRef}
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
