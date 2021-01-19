import { DetailedTranscriptSvgProps } from './types';
import { getCDSPositions, getNucleotideColor, getNucleotideLetterOffset, parseExons } from './helpers';

import { findAAFromCodon } from 'utils';
import { useStyles } from './styles';

const getRelativeCdsPositionsAndSequences = (
  exons: {
    start: number;
    end: number;
  }[],
  cdsStart: number,
  cdsEnd: number,
  sequence: string
) => {
  const hasCds = [];

  let codonsProcessed = 0;
  let leftover = false;

  for (const exon of exons) {
    if (exon.end < cdsStart) continue;

    if (exon.end > cdsEnd) {
      // End of the cds
      hasCds.push({
        start: exon.start,
        end: cdsEnd,
        sequence: sequence.slice(codonsProcessed, (cdsEnd - cdsStart) / 3),
      });

      // totalLength += sequence.slice(codonsProcessed, (cdsEnd - cdsStart) / 3).length;
    } else if (cdsStart > exon.start) {
      // Start of the cds
      const length = (exon.end - cdsStart + 1) / 3;

      hasCds.push({
        start: cdsStart,
        end: exon.end,
        sequence: sequence.slice(0, length),
      });

      codonsProcessed += length;

      // If we have a leftover aa
      // Skip the next aa
      leftover = length % 3 !== 0;
      if (leftover) codonsProcessed += 1;
    } else {
      // In between
      const length = (exon.end - exon.start + 1) / 3;

      // If we have a leftover aa
      leftover = length % 3 !== 0;

      // Skip 3 nucleotides if we had a aa leftover from the prev
      hasCds.push({
        start: exon.start + (leftover ? 3 : 0),
        end: exon.end,
        sequence: sequence.slice(codonsProcessed, codonsProcessed + length - (leftover ? 1 : 0)),
      });

      // Skip the next aa if leftover
      if (leftover) codonsProcessed += 1;

      codonsProcessed += length;
    }
  }

  return hasCds;
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

        let aminoacid = '';
        if (index !== 0 && index % 3 === 0) {
          aminoacid = findAAFromCodon(sequence.slice(index - 3, index));
        }
        return (
          <g key={index}>
            This is to check if codons are correctly positioned
            {index !== 0 && index % 3 === 0 ? (
              <>
                <rect fill='#ccf899' x={offset + index * 30 - 90} y={60} width={90} height={30} />
                <text
                  className={classes.codon}
                  transform={`translate(${offset + index * 30 + nucleotideLetterOffset + 30 - 90} 80)`}
                >
                  {aminoacid}
                </text>
                <line
                  x1={offset + index * 30 - 90}
                  x2={offset + index * 30 - 90}
                  y1={60}
                  y2={110}
                  stroke='#336'
                />
                <line x1={offset + index * 30} x2={offset + index * 30} y1={60} y2={110} stroke='#336' />
              </>
            ) : null}
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

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // viewBox={`0 0 650 22`}
      className={classes.svg}
      width={(maximumPosition - minimumPosition) * 30}
      {...props}
      style={{ height: `${30 + 30 + 30 * cdsPositions.length}` }}
    >
      {/* This is the rail behind nucleotides */}
      <line x1={0} x2={maximumPosition} y1={15} y2={15} stroke='#336' strokeWidth={2} strokeDasharray='30' />
      {/* These are the cds */}
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

        console.log(cdsPositions);

        return (
          <g key={index}>
            {/* This is the bg behind the whole CDS */}
            <rect
              fill='#f8e799'
              x={(cdsStart - minimumPosition - 1) * 30}
              y={30}
              width={(cdsEnd - cdsPositions[0].cdsStart + 1) * 30}
              height={30}
            />
            {/* These are the cds codons */}
            {relativeCdsPositionsAndSequences.map(({ start, sequence }, index) => {
              return (
                <g key={index}>
                  {sequence.split('').map((codon, index) => {
                    return (
                      <g key={index}>
                        <text className={classes.codon} x={start * 30 + index * 90 + 8} y={51}>
                          {codon}
                        </text>
                        {/* These are the dividers between codons */}
                        <line
                          x1={(start - 1) * 30 + index * 90}
                          x2={(start - 1) * 30 + index * 90}
                          y1={30}
                          y2={60}
                          stroke='#336'
                        />
                        <line
                          x1={(start - 1) * 30 + index * 90 + 90}
                          x2={(start - 1) * 30 + index * 90 + 90}
                          y1={30}
                          y2={60}
                          strokeWidth={index === 0 ? 0 : 1}
                          stroke='#336'
                        />
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        );
      })}
      {/* These are the exons */}
      {parsedExons.map((exon, index) => {
        return <ExonSequence key={index} exon={exon} minimumPosition={minimumPosition} />;
      })}
    </svg>
  );
};

export default DetailedTranscriptSvg;
