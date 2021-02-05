import React, { memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'react-window';

import { DetailedPeptideProps } from '../../types';
import { useStyles } from './styles';

const Peptide = memo(({ index, style, data }: DetailedPeptideProps) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativePeptidePositionsAndSequences } = data;

  // Find which peptide the current index belongs to
  const indexBelongsTo = relativePeptidePositionsAndSequences.filter(
    ({ start, end }) => index >= start && index <= end
  );

  // Put nothing if no peptide in this index at all
  if (!indexBelongsTo) return null;

  return (
    <g style={style}>
      {indexBelongsTo.map(({ start, end }, iterateIndex) => (
        <Fragment key={iterateIndex}>
          <rect className={classes.peptide} x={index * boxHeight} width={boxHeight} height={boxHeight} />
          {index === start || index === end + 1 ? (
            <line
              className={classes.divider}
              x1={index * boxHeight + 0.5}
              x2={index * boxHeight + 0.5}
              y1={0}
              y2={boxHeight}
            />
          ) : null}
        </Fragment>
      ))}
    </g>
  );
}, areEqual);

export default Peptide;
