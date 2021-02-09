import { memo } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'react-window';

import { DetailedCdsProps } from '../../types';
import { useStyles } from './styles';

const CDS = memo(({ index, style, data }: DetailedCdsProps) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativeCdsPositionsAndSequences, cdsStart, cdsEnd } = data;

  // Put nothing if no cds at this index at all
  const isCds = index >= cdsStart && index <= cdsEnd;
  if (!isCds) return null;

  // Check which cds this index belongs to
  const indexBelongsTo = relativeCdsPositionsAndSequences.find(
    ({ start, end }) => index >= start && index <= end
  );

  // Only put yellow box if CDS exists but no aminoacid
  if (!indexBelongsTo)
    return (
      <g style={style}>
        <rect className={classes.cdsBackground} x={index * boxHeight} width={boxHeight} height={boxHeight} />
      </g>
    );

  // Find the aminoacid
  const { start, sequence } = indexBelongsTo;
  const aminoacid = sequence.slice((index - start - 1) / 3, (index - start - 1) / 3 + 1);

  const textOffsetX = index * boxHeight + boxHeight / 2;
  const textOffsetY = boxHeight / 2 + boxHeight / 4 - boxHeight / 10;

  return (
    <g style={style}>
      <rect className={classes.cdsBackground} x={index * boxHeight} width={boxHeight} height={boxHeight} />
      {/* Put a vertical line if this is the start of the aminoacid */}
      {/* +0.5 because it looks better */}
      {(index - start) % 3 === 0 ? (
        <line
          x1={index * boxHeight + 0.5}
          x2={index * boxHeight + 0.5}
          y1={0}
          y2={boxHeight}
          className={classes.divider}
        />
      ) : // Put the aminoacid text if this is the middle index
      (index - start) % 3 === 1 && boxHeight > 5 ? (
        <text x={textOffsetX} y={textOffsetY} fontSize={boxHeight / 2} className={classes.aminoacid}>
          {aminoacid}
        </text>
      ) : null}
    </g>
  );
}, areEqual);

export default CDS;
