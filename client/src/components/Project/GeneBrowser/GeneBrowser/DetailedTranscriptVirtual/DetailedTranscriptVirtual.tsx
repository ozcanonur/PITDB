import { forwardRef, useMemo } from 'react';

import { FixedSizeList as VirtualizedList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { TranscriptData } from '../../types';
import {
  getRelativeExonPositionsAndSequences,
  getNucleotideColor,
  getCDSStartsAndEnds,
  getRelativeCdsPositionsAndSequences,
} from './helpers';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

const Nucleotide2 = ({ index, style, data }: ListChildComponentProps) => {
  const classes = useStyles();

  const exonPositions: {
    sequence: string;
    start: number;
    end: number;
    length: number;
  }[] = data;

  const indexBelongsTo = exonPositions.find(({ start, end }) => index >= start && index <= end);

  if (!indexBelongsTo) return null;

  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;

  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);
  const nucleotideColor = getNucleotideColor(nucleotide);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

  return (
    <g style={style}>
      <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      <text x={textOffsetX} y={textOffsetY} className={classes.nucleotide} fontSize={BOX_HEIGHT / 3}>
        {index}
      </text>
    </g>
  );
};

const Nucleotide = ({ index, style, data }: ListChildComponentProps) => {
  const classes = useStyles();

  const exonPositions: {
    sequence: string;
    start: number;
    end: number;
    length: number;
  }[] = data;

  const indexBelongsTo = exonPositions.find(({ start, end }) => index >= start && index <= end);

  if (!indexBelongsTo)
    return (
      <line
        x1={index * BOX_HEIGHT}
        x2={(index + 1) * BOX_HEIGHT}
        y1={BOX_HEIGHT / 2}
        y2={BOX_HEIGHT / 2}
        stroke='#336'
        strokeWidth={2}
      />
    );

  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;

  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);
  const nucleotideColor = getNucleotideColor(nucleotide);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

  return (
    <g style={style}>
      <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      <text x={textOffsetX} y={textOffsetY} fontSize={BOX_HEIGHT / 2} className={classes.nucleotide}>
        {nucleotide}
      </text>
    </g>
  );
};

const CDS = ({ index, style, data }: ListChildComponentProps) => {
  const classes = useStyles();

  const cdsPositions: {
    start: number;
    end: number;
    sequence: string;
  }[] = data.relativeCdsPositionsAndSequences;

  const { cdsStart, cdsEnd } = data;

  // Put nothing if no cds in this box at all
  const isCds = index >= cdsStart && index <= cdsEnd;
  if (!isCds) return null;

  const indexBelongsTo = cdsPositions.find(({ start, end }) => index >= start && index <= end);

  // Only put yellow box if CDS exists but no aminoacid
  if (!indexBelongsTo)
    return (
      <rect className={classes.cdsBackground} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
    );

  const { start, sequence } = indexBelongsTo;

  const aminoacid = sequence.slice((index - start - 1) / 3, (index - start - 1) / 3 + 1);

  return (
    <g style={style}>
      <rect className={classes.cdsBackground} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      {(index - start) % 3 === 0 ? (
        <line
          x1={index * BOX_HEIGHT}
          x2={index * BOX_HEIGHT}
          y1={0}
          y2={BOX_HEIGHT}
          className={classes.divider}
        />
      ) : (index - start) % 3 === 1 ? (
        <text
          x={index * BOX_HEIGHT + BOX_HEIGHT / 2}
          y={BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3}
          fontSize={BOX_HEIGHT / 2}
          className={classes.aminoacid}
        >
          {aminoacid}
        </text>
      ) : null}
    </g>
  );
};

const DetailedTranscriptVirtual = ({ transcriptData }: { transcriptData: TranscriptData }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = transcriptData;

  const exonPositions = getRelativeExonPositionsAndSequences(transcriptData);
  const cdsStartAndEndsAndSequences = getCDSStartsAndEnds(transcriptData);

  const OuterElementType = useMemo(
    () => forwardRef((props, ref: any) => <div data-scroll {...props} ref={ref} />),
    []
  );

  return (
    <div
      className={classes.detailedTranscriptContainer}
      style={{ height: BOX_HEIGHT * 2 + cdsStartAndEndsAndSequences.length * BOX_HEIGHT }}
    >
      <AutoSizer>
        {({ width }) => (
          <>
            {/* This is to check indexes for accurate cds/peptide positioning */}
            <VirtualizedList
              height={BOX_HEIGHT}
              itemCount={maximumPosition - minimumPosition + 1}
              itemSize={BOX_HEIGHT}
              layout='horizontal'
              width={width}
              innerElementType='svg'
              itemData={exonPositions}
              style={{ overflow: 'hidden' }}
              outerElementType={OuterElementType}
              overscanCount={60}
            >
              {Nucleotide2}
            </VirtualizedList>
            {/* These are the exons */}
            <VirtualizedList
              height={BOX_HEIGHT}
              itemCount={maximumPosition - minimumPosition + 1}
              itemSize={BOX_HEIGHT}
              layout='horizontal'
              width={width}
              innerElementType='svg'
              itemData={exonPositions}
              style={{ overflow: 'hidden' }}
              outerElementType={OuterElementType}
              overscanCount={60}
            >
              {Nucleotide}
            </VirtualizedList>
            {/* These are the CDSs */}
            {cdsStartAndEndsAndSequences.map(({ cdsStart, cdsEnd, sequence, isReverse }, index) => {
              const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
                exonPositions,
                cdsStart,
                cdsEnd,
                sequence,
                isReverse
              );

              return (
                <VirtualizedList
                  key={index}
                  height={BOX_HEIGHT}
                  itemCount={maximumPosition - minimumPosition + 1}
                  itemSize={BOX_HEIGHT}
                  layout='horizontal'
                  width={width}
                  innerElementType='svg'
                  itemData={{ relativeCdsPositionsAndSequences, cdsStart, cdsEnd }}
                  style={{ overflow: 'hidden' }}
                  outerElementType={OuterElementType}
                  overscanCount={60}
                >
                  {CDS}
                </VirtualizedList>
              );
            })}
          </>
        )}
      </AutoSizer>
    </div>
  );
};

export default DetailedTranscriptVirtual;
