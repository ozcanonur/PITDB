import { memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'react-window';

import { DetailedPeptideProps } from '../../types';
import { useStyles } from './styles';

const Peptide = memo(({ index, style, data }: DetailedPeptideProps) => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const { relativePeptidePositionsAndSequences, relativeCdsPositionsAndSequences } = data;

  // Find which peptide the current index belongs to
  const indexBelongsTo = relativePeptidePositionsAndSequences.filter(
    ({ start, end }) => index >= start && index <= end
  );

  // Put nothing if no peptide in this index at all
  if (!indexBelongsTo) return null;

  const isInCds = relativeCdsPositionsAndSequences.find(({ start, end }) => index >= start && index <= end);

  return (
    <g style={style}>
      {indexBelongsTo.map(({ start, end }, iterateIndex) => (
        <Fragment key={iterateIndex}>
          {index === start ? (
            <line
              className={classes.divider}
              x1={index * boxHeight + 0.5}
              x2={index * boxHeight + 0.5}
              y1={0}
              y2={boxHeight}
            />
          ) : index === end ? (
            <line
              className={classes.divider}
              x1={index * boxHeight + boxHeight + 0.5}
              x2={index * boxHeight + boxHeight + 0.5}
              y1={0}
              y2={boxHeight}
            />
          ) : null}
          {isInCds ? (
            <rect className={classes.peptide} x={index * boxHeight} width={boxHeight} height={boxHeight} />
          ) : (
            <line
              x1={index * boxHeight}
              x2={index * boxHeight + boxHeight}
              y1={boxHeight / 2}
              y2={boxHeight / 2}
              className={classes.peptideInIntron}
              strokeWidth={boxHeight / 5}
            />
          )}
        </Fragment>
      ))}
    </g>
  );
}, areEqual);

export default Peptide;
