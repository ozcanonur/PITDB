import { DetailedTranscriptSvgProps } from './types';
import {
  getCDSPositions,
  getNucleotideColor,
  parseExons,
  getRelativeCdsPositionsAndSequences,
  getRelativePeptidePositionsAndSequences,
} from './helpers';

import { useStyles } from './styles';

const BOX_HEIGHT = 30;

const ExonSequence = ({
  exon,
  minimumPosition,
}: {
  exon: { sequence: string; start: number };
  minimumPosition: number;
}) => {
  const classes = useStyles();

  const { sequence, start } = exon;

  const offset = (start - minimumPosition) * BOX_HEIGHT;

  return (
    <>
      {sequence.split('').map((nucleotide, index) => {
        const color = getNucleotideColor(nucleotide);

        const fontSize = BOX_HEIGHT / 2;
        const textOffsetX = offset + index * BOX_HEIGHT + BOX_HEIGHT / 2;
        // -2 because reasons that I have no idea about
        const textOffsetY = BOX_HEIGHT / 2 + fontSize / 2 - 2;

        return (
          <g key={index}>
            <rect fill={color} x={offset + index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
            <text className={classes.nucleotide} fontSize={fontSize} x={textOffsetX} y={textOffsetY}>
              {nucleotide}
            </text>
          </g>
        );
      })}
    </>
  );
};

const CdsSequence = ({
  relativeCdsPositionAndSequence,
}: {
  relativeCdsPositionAndSequence: {
    start: number;
    sequence: string;
  };
}) => {
  const classes = useStyles();

  const { start, sequence } = relativeCdsPositionAndSequence;

  const sequenceArray = sequence.split('');

  return (
    <>
      {sequenceArray.map((codon, index) => {
        const fontSize = BOX_HEIGHT / 2;
        const textOffsetX = start * BOX_HEIGHT + index * BOX_HEIGHT * 3 + (BOX_HEIGHT * 3) / 2;
        // -2 because reasons that I have no idea about
        const textOffsetY = BOX_HEIGHT + BOX_HEIGHT / 2 + fontSize / 2 - 2;

        const leftDividerPos = start * BOX_HEIGHT + index * BOX_HEIGHT * 3;
        const rightDividerPos = leftDividerPos + BOX_HEIGHT * 3;

        return (
          <g key={index}>
            <text className={classes.codon} x={textOffsetX} y={textOffsetY} fontSize={fontSize}>
              {codon}
            </text>
            {/* These are the dividers between codons */}
            <line
              x1={leftDividerPos}
              x2={leftDividerPos}
              y1={BOX_HEIGHT}
              y2={BOX_HEIGHT * 2}
              className={classes.divider}
            />
            {index === sequenceArray.length - 1 ? (
              <line
                x1={rightDividerPos}
                x2={rightDividerPos}
                y1={BOX_HEIGHT}
                y2={BOX_HEIGHT * 2}
                className={classes.divider}
                strokeWidth={0.8}
              />
            ) : null}
          </g>
        );
      })}
    </>
  );
};

const Peptide = ({
  relativeCdsPositionAndSequence,
}: {
  relativeCdsPositionAndSequence: { start: number; end: number };
}) => {
  const classes = useStyles();

  const { start, end } = relativeCdsPositionAndSequence;

  return (
    <>
      <rect
        className={classes.peptide}
        x={start * BOX_HEIGHT}
        y={BOX_HEIGHT * 2}
        width={(end - start + 1) * BOX_HEIGHT}
        height={BOX_HEIGHT}
      />
      <line
        x1={start * BOX_HEIGHT}
        x2={start * BOX_HEIGHT}
        y1={BOX_HEIGHT * 2}
        y2={BOX_HEIGHT * 3}
        className={classes.divider}
      />
      <line
        x1={start * BOX_HEIGHT + (end - start + 1) * BOX_HEIGHT}
        x2={start * BOX_HEIGHT + (end - start + 1) * BOX_HEIGHT}
        y1={BOX_HEIGHT * 2}
        y2={BOX_HEIGHT * 3}
        className={classes.divider}
      />
    </>
  );
};

const DetailedTranscriptSvg = ({ transcriptData, ...props }: DetailedTranscriptSvgProps) => {
  const classes = useStyles();

  const { transcript, minimumPosition, maximumPosition } = transcriptData;

  const parsedExons = parseExons(transcript);

  const cdsPositions = getCDSPositions(transcriptData);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classes.svg}
      width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
      style={{ height: `${BOX_HEIGHT + BOX_HEIGHT + cdsPositions.length * BOX_HEIGHT}` }}
      {...props}
    >
      {/* This is the rail behind nucleotides */}
      <line
        x1={(transcript.start - minimumPosition) * BOX_HEIGHT}
        x2={(transcript.end - minimumPosition + 1) * BOX_HEIGHT}
        y1={BOX_HEIGHT / 2}
        y2={BOX_HEIGHT / 2}
        className={classes.rail}
      />
      {/* These are the CDSs */}
      {cdsPositions.map(({ cdsStart, cdsEnd, sequence }, index) => {
        const relativeExonPositions = parsedExons.map(({ start, end }) => ({
          start: start - minimumPosition,
          end: end - minimumPosition,
        }));

        const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
          relativeExonPositions,
          cdsStart - minimumPosition,
          cdsEnd - minimumPosition,
          sequence
        );

        const relativePeptidePositionsAndSequences = getRelativePeptidePositionsAndSequences(
          relativeCdsPositionsAndSequences,
          sequence,
          // @ts-ignore
          transcript.cds[0].peptides
        );

        return (
          <g key={index}>
            {/* This is the bg behind the whole CDS */}
            <rect
              className={classes.cdsBackground}
              x={(cdsStart - minimumPosition) * BOX_HEIGHT}
              y={BOX_HEIGHT}
              width={(cdsEnd - cdsPositions[0].cdsStart + 1) * BOX_HEIGHT}
              height={BOX_HEIGHT}
            />
            {/* These are the cds codons */}
            {relativeCdsPositionsAndSequences.map((relativeCdsPositionAndSequence, index) => (
              <CdsSequence key={index} relativeCdsPositionAndSequence={relativeCdsPositionAndSequence} />
            ))}
            {/* These are the peptides */}
            {relativePeptidePositionsAndSequences.map((relativeCdsPositionAndSequence, index) => (
              <Peptide key={index} relativeCdsPositionAndSequence={relativeCdsPositionAndSequence} />
            ))}
          </g>
        );
      })}
      {/* These are the exons */}
      {parsedExons.map((exon, index) => (
        <ExonSequence key={index} exon={exon} minimumPosition={minimumPosition} />
      ))}
    </svg>
  );
};

export default DetailedTranscriptSvg;
