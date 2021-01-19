import { DetailedTranscriptSvgProps } from './types';
import {
  getCDSPositions,
  getNucleotideColor,
  parseExons,
  getRelativeCdsPositionsAndSequences,
} from './helpers';

import { useStyles } from './styles';

const BOX_HEIGHT = 30;

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

  return (
    <>
      {sequence.split('').map((codon, index) => {
        const fontSize = BOX_HEIGHT / 2;
        const textOffsetX = start * BOX_HEIGHT + index * BOX_HEIGHT * 3 + (BOX_HEIGHT * 3) / 2;
        const textOffsetY = BOX_HEIGHT + BOX_HEIGHT / 2 + fontSize / 2 - 1;

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
              className={classes.cdsDivider}
            />
            <line
              x1={rightDividerPos}
              x2={rightDividerPos}
              y1={BOX_HEIGHT}
              y2={BOX_HEIGHT * 2}
              stroke='#336'
            />
          </g>
        );
      })}
    </>
  );
};

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
        const textOffsetY = BOX_HEIGHT / 2 + fontSize / 2 - 1;

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
      style={{ height: `${BOX_HEIGHT + cdsPositions.length * BOX_HEIGHT}` }}
      {...props}
    >
      {/* This is the rail behind nucleotides */}
      <line
        x1={0}
        x2={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
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
