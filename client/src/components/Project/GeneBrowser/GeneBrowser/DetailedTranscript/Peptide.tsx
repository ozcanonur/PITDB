import React, { memo, Fragment } from 'react';

import { areEqual } from 'react-window';

import { DetailedPeptideProps } from '../../types';

import { useStyles } from './styles';

const BOX_HEIGHT = 30;

const Peptide = memo(({ index, style, data }: DetailedPeptideProps) => {
  const classes = useStyles();

  const { relativePeptidePositionsAndSequences } = data;

  const indexBelongsTo = relativePeptidePositionsAndSequences.filter(
    ({ start, end }) => index >= start && index <= end
  );

  // Put nothing if no peptide in this index at all
  if (!indexBelongsTo) return null;

  return (
    <g style={style}>
      {indexBelongsTo.map(({ start, end }, iterateIndex) => (
        <Fragment key={iterateIndex}>
          <rect className={classes.peptide} x={index * BOX_HEIGHT} width={BOX_HEIGHT} height={BOX_HEIGHT} />
          {index === start || index === end + 1 ? (
            <line
              className={classes.divider}
              x1={index * BOX_HEIGHT + 0.5}
              x2={index * BOX_HEIGHT + 0.5}
              y1={0}
              y2={BOX_HEIGHT}
            />
          ) : null}
        </Fragment>
      ))}
    </g>
  );
}, areEqual);

export default Peptide;
