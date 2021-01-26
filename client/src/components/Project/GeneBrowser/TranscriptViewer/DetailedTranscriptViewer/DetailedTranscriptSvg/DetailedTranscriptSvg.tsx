import { useSelector } from 'react-redux';
import { VariableSizeList as List } from 'react-window';

import { DetailedTranscriptSvgProps } from './types';
import {
  getCDSStartsAndEnds,
  getNucleotideColor,
  getRelativeExonPositionsAndSequences,
  getRelativeCdsPositionsAndSequences,
  getRelativePeptidePositionsAndSequences,
} from './helpers';

import { useStyles } from './styles';

const ExonSequence = ({ exon }: { exon: { sequence: string; start: number } }) => {
  const classes = useStyles();

  const { sequence, start } = exon;

  const { boxHeight } = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  return (
    <svg>
      {sequence.split('').map((nucleotide, index) => {
        const color = getNucleotideColor(nucleotide);

        const fontSize = boxHeight / 2;
        const textOffsetX = start * boxHeight + index * boxHeight + boxHeight / 2;
        // -2 because of reasons that I have no idea about
        const textOffsetY = boxHeight / 2 + fontSize / 2 - 2;

        return (
          <svg key={index}>
            <rect
              fill={color}
              x={start * boxHeight + index * boxHeight}
              width={boxHeight}
              height={boxHeight}
            />
            <text className={classes.nucleotide} fontSize={fontSize} x={textOffsetX} y={textOffsetY}>
              {nucleotide}
            </text>
          </svg>
        );
      })}
    </svg>
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

  const { boxHeight } = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { start, sequence } = relativeCdsPositionAndSequence;

  const sequenceArray = sequence.split('');

  return (
    <>
      {sequenceArray.map((codon, index) => {
        const fontSize = boxHeight / 2;
        const textOffsetX = start * boxHeight + index * boxHeight * 3 + (boxHeight * 3) / 2;
        // -2 because of reasons that I have no idea about
        const textOffsetY = boxHeight + boxHeight / 2 + fontSize / 2 - 2;

        const leftDividerPos = start * boxHeight + index * boxHeight * 3;
        const rightDividerPos = leftDividerPos + boxHeight * 3;

        return (
          <g key={index}>
            <text className={classes.codon} x={textOffsetX} y={textOffsetY} fontSize={fontSize}>
              {codon}
            </text>
            {/* These are the dividers between codons */}
            <line
              x1={leftDividerPos}
              x2={leftDividerPos}
              y1={boxHeight}
              y2={boxHeight * 2}
              className={classes.divider}
            />
            {index === sequenceArray.length - 1 ? (
              <line
                x1={rightDividerPos}
                x2={rightDividerPos}
                y1={boxHeight}
                y2={boxHeight * 2}
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
  relativeCdsPositionAndSequence: { start: number; end: number; mods: { type: string; pos: number }[] };
}) => {
  const classes = useStyles();

  const { boxHeight } = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { start, end, mods } = relativeCdsPositionAndSequence;

  // points = `${(testMod.pos + start - 1) * BOX_HEIGHT - BOX_HEIGHT * 2},${BOX_HEIGHT * 4} ${
  //   (testMod.pos + start - 1) * BOX_HEIGHT - BOX_HEIGHT / 2
  // },${BOX_HEIGHT * 3} ${(testMod.pos + start + 1) * BOX_HEIGHT - BOX_HEIGHT},${BOX_HEIGHT * 4}`;

  // console.log(mods);

  // WOOP, PTMS are A MESS, not working, FIX
  return (
    <>
      {/* {mods.map((mod, index) => {
        // console.log((mod.pos - 1) * BOX_HEIGHT);
        return (
          <rect
            key={index}
            x={(mod.pos - 1) * BOX_HEIGHT - BOX_HEIGHT * 2}
            y={BOX_HEIGHT * 3}
            width={BOX_HEIGHT * 3}
            height={BOX_HEIGHT}
            className={classes.mod}
          />
        );
      })} */}
      <rect
        className={classes.peptide}
        x={start * boxHeight}
        y={boxHeight * 2}
        width={(end - start + 1) * boxHeight}
        height={boxHeight}
      />
      <line
        x1={start * boxHeight}
        x2={start * boxHeight}
        y1={boxHeight * 2}
        y2={boxHeight * 3}
        className={classes.divider}
      />
      <line
        x1={start * boxHeight + (end - start + 1) * boxHeight}
        x2={start * boxHeight + (end - start + 1) * boxHeight}
        y1={boxHeight * 2}
        y2={boxHeight * 3}
        className={classes.divider}
      />
    </>
  );
};

// const ExonRenderer = ({ data, index, style }) => {
//   const classes = useStyles();

//   const { boxHeight } = useSelector((state: RootState) => state.geneBrowserBoxHeight);

//   console.log(data);

//   // if (index > 0) return null;

//   const exon = data.data[index];

//   const { sequence, start } = exon;

//   return (
//     <svg style={style}>
//       {sequence.split('').map((nucleotide, index) => {
//         const color = getNucleotideColor(nucleotide);

//         const fontSize = boxHeight / 2;
//         const textOffsetX = start * boxHeight + index * boxHeight + boxHeight / 2;
//         // -2 because of reasons that I have no idea about
//         const textOffsetY = boxHeight / 2 + fontSize / 2 - 2;

//         return (
//           <svg key={index}>
//             <rect
//               fill={color}
//               x={start * boxHeight + index * boxHeight}
//               width={boxHeight}
//               height={boxHeight}
//             />
//             <text className={classes.nucleotide} fontSize={fontSize} x={textOffsetX} y={textOffsetY}>
//               {nucleotide}
//             </text>
//           </svg>
//         );
//       })}
//     </svg>
//   );
// };

const DetailedTranscriptSvg = ({ transcriptData, ...props }: DetailedTranscriptSvgProps) => {
  const classes = useStyles();

  const { boxHeight } = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { transcript, minimumPosition, maximumPosition } = transcriptData;

  const exonPositions = getRelativeExonPositionsAndSequences(transcriptData);
  const cdsStartAndEndsAndSequences = getCDSStartsAndEnds(transcriptData);

  const peptideLineCount =
    (transcript.cds &&
      transcript.cds.map(({ peptides }) => peptides).filter((e) => e !== undefined).length) ||
    0;
  const cdsCount = transcript.cds ? transcript.cds.length : 0;
  let svgHeight = boxHeight + cdsCount * boxHeight + peptideLineCount * boxHeight;

  const exonLengths = exonPositions.map((e) => e.length);

  const getItemSize = (index: number) => exonLengths[index];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classes.svg}
      width={(maximumPosition - minimumPosition + 1) * boxHeight}
      style={{ height: svgHeight }}
      {...props}
    >
      <svg>
        {/* This is the rail behind nucleotides */}
        <line
          x1={(transcript.start - minimumPosition) * boxHeight}
          x2={(transcript.end - minimumPosition + 1) * boxHeight}
          y1={boxHeight / 2}
          y2={boxHeight / 2}
          className={classes.rail}
        />
      </svg>
      <svg>
        {/* These are the exons */}
        {exonPositions.map((exon, index) => (
          <ExonSequence key={index} exon={exon} />
        ))}
      </svg>
      <svg>
        {/* These are the CDSs */}
        {cdsStartAndEndsAndSequences.map(({ cdsStart, cdsEnd, sequence, isReverse }, cdsIndex) => {
          const relativeCdsPositionsAndSequences = getRelativeCdsPositionsAndSequences(
            exonPositions,
            cdsStart,
            cdsEnd,
            sequence,
            isReverse
          );

          const relativePeptidePositionsAndSequences = getRelativePeptidePositionsAndSequences(
            relativeCdsPositionsAndSequences,
            sequence,
            // @ts-ignore
            transcript.cds[cdsIndex].peptides
          );

          return (
            <g key={cdsIndex} transform={`translate(0 ${cdsIndex * boxHeight})`}>
              {/* This is the bg behind the whole CDS */}
              <rect
                className={classes.cdsBackground}
                x={cdsStart * boxHeight}
                y={boxHeight}
                width={(cdsEnd - cdsStart + 1) * boxHeight}
                height={boxHeight}
              />
              {/* These are the cds codons */}
              {relativeCdsPositionsAndSequences.map((relativeCdsPositionAndSequence, index) => (
                <g key={index}>
                  <CdsSequence relativeCdsPositionAndSequence={relativeCdsPositionAndSequence} />
                </g>
              ))}
              {/* These are the peptides */}
              {relativePeptidePositionsAndSequences.map((relativePeptidePositionAndSequence, index) => (
                <g key={index}>
                  <Peptide relativeCdsPositionAndSequence={relativePeptidePositionAndSequence} />
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </svg>
  );
};

export default DetailedTranscriptSvg;
