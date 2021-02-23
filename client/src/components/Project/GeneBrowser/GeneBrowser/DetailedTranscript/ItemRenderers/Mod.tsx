import { useState, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'react-window';

import { DetailedModProps } from '../../types';
import { useStyles } from '../styles';

const Mod = memo(({ index, style, data }: DetailedModProps) => {
  const classes = useStyles();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativeModPositionsAndTypes } = data;

  // They will always be 1 aminoacid behind = 3 indexes. 3-1 = 2 to center the triangle
  const indexBelongsTo = relativeModPositionsAndTypes.find(({ pos }) => pos - 2 === index);

  const handleMove = useCallback(() => {
    setTooltipOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    setTooltipOpen(false);
  }, []);

  if (!indexBelongsTo) return null;

  return (
    <g style={style}>
      <polygon
        points={`${index * boxHeight}, ${boxHeight} ${index * boxHeight + boxHeight / 2}, 0 ${
          index * boxHeight + boxHeight
        },${boxHeight}`}
        className={classes.mod}
        onMouseMove={handleMove}
        onMouseOut={handleLeave}
      />
      {tooltipOpen ? (
        <>
          <rect
            x={index * boxHeight - indexBelongsTo.type.length * ((boxHeight * 4) / 15) - boxHeight}
            y={0}
            width={indexBelongsTo.type.length * ((boxHeight * 4) / 15) + boxHeight - boxHeight / 8}
            height={boxHeight}
            className={classes.tooltipRect}
          />
          <text
            x={index * boxHeight - indexBelongsTo.type.length * ((boxHeight * 4) / 15) - boxHeight / 2.5}
            y={boxHeight / 2 + boxHeight / 4 - boxHeight / 15}
            fontSize={boxHeight / 2.05}
            className={classes.tooltipText}
          >
            {indexBelongsTo.type}
          </text>
        </>
      ) : null}
    </g>
  );
}, areEqual);

export default Mod;
