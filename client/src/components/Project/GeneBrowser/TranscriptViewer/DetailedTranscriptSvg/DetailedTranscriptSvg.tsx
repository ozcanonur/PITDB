import { DetailedTranscriptSvgProps } from './types';

import { useStyles } from './styles';
import { Transcript } from '../types';
import { getCDSPositions } from './helpers';

const getNucleotideColor = (nucleotide: string) => {
  let color = '#336';
  if (nucleotide === 'C') color = '#673f7e';
  else if (nucleotide === 'T') color = '#6b88a2';
  else if (nucleotide === 'G') color = '#1b2742';

  return color;
};

const getNucleotideLetterOffset = (nucleotide: string) => (nucleotide === 'T' ? 10 : 8);

const parseExons = (transcript: Transcript) => {
  let lastExonEndedAt = 0;
  const parsedExons = transcript.exons
    .sort((x, y) => x.start - y.start)
    .map(({ start, end }) => {
      const exonLength = end - start + 1;

      const exonSequence = transcript.seq.slice(lastExonEndedAt, lastExonEndedAt + exonLength);

      lastExonEndedAt += exonLength;

      return { sequence: exonSequence, start };
    });

  return parsedExons;
};

const parseCDSs = (
  cdss: {
    cdsStart: number;
    cdsEnd: number;
    sequence: string;
  }[]
) => {
  let parsedCDSs = cdss.sort((x, y) => x.cdsStart - y.cdsStart);

  // @ts-ignore
  parsedCDSs = parsedCDSs.map(({ cdsStart, cdsEnd, sequence }) => {
    const cdsLength = cdsStart - cdsEnd + 1;

    console.log(sequence.length);
  });
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

  const offset = (start - minimumPosition) * 30;

  return (
    <>
      {sequence.split('').map((nucleotide, index) => {
        const color = getNucleotideColor(nucleotide);
        const nucleotideLetterOffset = getNucleotideLetterOffset(nucleotide);

        return (
          <g key={index}>
            <rect fill={color} x={offset + index * 30} width={30} height={30} />
            <text
              className={classes.nucleotide}
              transform={`translate(${offset + index * 30 + nucleotideLetterOffset} 21)`}
            >
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

  console.log(cdsPositions);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // viewBox={`0 0 650 22`}
      className={classes.svg}
      width={(maximumPosition - minimumPosition) * 30}
      {...props}
      overflow='auto'
      style={{ height: `${3 + 3 * cdsPositions.length}rem` }}
    >
      {parsedExons.map((exon, index) => {
        return <ExonSequence key={index} exon={exon} minimumPosition={minimumPosition} />;
      })}
      {cdsPositions.map(({ cdsStart, cdsEnd, sequence }, index) => {
        return (
          <g key={index}>
            <rect
              fill='#F8E799'
              x={(cdsStart - minimumPosition) * 30}
              y={30}
              width={30 * (cdsEnd - cdsStart + 1)}
              height={30}
            />
            <text
              className={classes.codon}
              transform={`translate(${(cdsStart - minimumPosition) * 30 + index * 30 + 40} 51)`}
            >
              {sequence.charAt(2)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default DetailedTranscriptSvg;
