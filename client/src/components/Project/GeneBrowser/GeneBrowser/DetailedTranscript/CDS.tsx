import { memo } from 'react';
import { areEqual } from 'react-window';

import { DetailedCdsProps } from '../../types';
import { useStyles } from './styles';

const BOX_HEIGHT = 30;

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

export default CDS;
