import { memo } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'react-window';

import { DetailedModProps } from '../../types';
import { useStyles } from './styles';

const Mod = memo(({ index, style, data }: DetailedModProps) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativeModPositionsAndTypes } = data;

  const indexBelongsTo = relativeModPositionsAndTypes.find(({ pos }) => pos === index);

  if (!indexBelongsTo) return null;

  return (
    <g style={style}>
      <rect
        className={classes.mod}
        x={index * boxHeight - boxHeight / 2}
        width={boxHeight}
        height={boxHeight}
      />
    </g>
  );
}, areEqual);

export default Mod;
