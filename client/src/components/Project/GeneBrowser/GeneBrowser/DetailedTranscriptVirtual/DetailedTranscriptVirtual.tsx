import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import { Fragment } from 'react';
import { TranscriptProps } from '../../types';

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

  if (!indexBelongsTo) return null;

  const { sequence: exonSequence, start: exonStart } = indexBelongsTo;

  const nucleotide = exonSequence.slice(index - exonStart, index - exonStart + 1);
  const nucleotideColor = getNucleotideColor(nucleotide);

  const textOffsetX = index * BOX_HEIGHT + BOX_HEIGHT / 2;
  const textOffsetY = BOX_HEIGHT / 2 + BOX_HEIGHT / 4 - 3;

  return (
    <g style={style}>
      <rect fill={nucleotideColor} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
      <text x={textOffsetX} y={textOffsetY} className={classes.nucleotide} fontSize={BOX_HEIGHT / 2}>
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
    return <rect fill='#FFDE4D' x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />;

  const { start, sequence } = indexBelongsTo;

  const aminoacid = sequence.slice((index - start - 1) / 3, (index - start - 1) / 3 + 1);

  return (
    <g style={style}>
      <rect fill='#FFDE4D' x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
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

const DetailedTranscriptVirtual = ({ transcriptData, ...props }: TranscriptProps) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = transcriptData;

  const exonPositions = getRelativeExonPositionsAndSequences(transcriptData);

  const cdsStartAndEndsAndSequences = getCDSStartsAndEnds(transcriptData);

  const { cdsStart, cdsEnd, sequence, isReverse } = cdsStartAndEndsAndSequences[0];

  const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
    exonPositions,
    cdsStart,
    cdsEnd,
    sequence,
    isReverse
  );

  console.log(relativeCdsPositionsAndSequences);

  return (
    <div className={classes.detailedTranscriptContainer} style={{ height: '135px' }}>
      <AutoSizer>
        {({ height, width }) => (
          <ScrollSync>
            <>
              <ScrollSyncPane>
                <List
                  height={height / 3}
                  itemCount={maximumPosition - minimumPosition + 1}
                  itemSize={BOX_HEIGHT}
                  layout='horizontal'
                  width={width}
                  innerElementType='svg'
                  itemData={exonPositions}
                  style={{ overflowY: 'hidden' }}
                >
                  {Nucleotide2}
                </List>
              </ScrollSyncPane>
              <ScrollSyncPane>
                <List
                  height={height / 3}
                  itemCount={maximumPosition - minimumPosition + 1}
                  itemSize={BOX_HEIGHT}
                  layout='horizontal'
                  width={width}
                  innerElementType='svg'
                  itemData={exonPositions}
                  style={{ overflowY: 'hidden' }}
                >
                  {Nucleotide}
                </List>
              </ScrollSyncPane>
              <ScrollSyncPane>
                <List
                  height={height / 3}
                  itemCount={maximumPosition - minimumPosition + 1}
                  itemSize={BOX_HEIGHT}
                  layout='horizontal'
                  width={width}
                  innerElementType='svg'
                  itemData={{ relativeCdsPositionsAndSequences, cdsStart, cdsEnd }}
                  style={{ overflowY: 'hidden' }}
                >
                  {CDS}
                </List>
              </ScrollSyncPane>
            </>
          </ScrollSync>
        )}
      </AutoSizer>
    </div>
  );
};

export default DetailedTranscriptVirtual;
