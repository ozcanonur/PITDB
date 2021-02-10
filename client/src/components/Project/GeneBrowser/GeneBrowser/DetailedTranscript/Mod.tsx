import { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'react-window';

import { DetailedModProps } from '../../types';
import { useStyles } from './styles';

const Mod = memo(({ index, style, data }: DetailedModProps) => {
  const classes = useStyles();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativeModPositionsAndTypes } = data;

  // WOOP, not sure about this actually
  // They will always be 2 indexes behind
  const indexBelongsTo = relativeModPositionsAndTypes.find(({ pos }) => pos - 2 === index);

  if (!indexBelongsTo) return null;

  const handleMove = () => {
    setTooltipOpen(true);
  };

  const handleLeave = () => {
    setTooltipOpen(false);
  };

  return (
    <g style={style}>
      <polygon
        points={`${index * boxHeight},${boxHeight} ${index * boxHeight + boxHeight / 2}, 0 ${
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
            x={index * boxHeight - indexBelongsTo.type.length * ((boxHeight * 4) / 15) - boxHeight / 2}
            y={boxHeight / 2 + boxHeight / 4 - 1}
            fontSize={boxHeight / 2}
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
