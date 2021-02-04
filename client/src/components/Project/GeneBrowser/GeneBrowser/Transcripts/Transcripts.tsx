import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TranscriptsResponse, PositionLineProps } from '../../types';
import { useStyles } from './styles';
import { setGeneBrowserScrollJumpPositionPercent, setGeneBrowserMouseoverScrollPosition } from 'actions';

import Transcript from '../Transcript/Transcript';

const CurrentPositionLine = ({ maximumPosition, minimumPosition }: PositionLineProps) => {
  const classes = useStyles();

  const scrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const maxTranscriptWidth = maximumPosition - minimumPosition;
  const currentGenomePosition = Math.floor(minimumPosition + (maxTranscriptWidth * scrollPosition) / 100);

  return (
    <div className={classes.transcriptPositionLineContainer}>
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${scrollPosition}%`,
          transform: scrollPosition >= 50 ? 'translateX(-16.4rem)' : 'none',
        }}
      >
        {`You are at ${currentGenomePosition.toLocaleString()}`}
      </div>
      <div
        className={classes.transcriptPositionLine}
        style={{
          left: scrollPosition > 99.6 ? '100%' : `${scrollPosition}%`,
        }}
      />
    </div>
  );
};

const MouseoverPositionLine = ({ maximumPosition, minimumPosition }: PositionLineProps) => {
  const classes = useStyles();

  const mouseoverPosition = useSelector((state: RootState) => state.geneBrowserMouseoverPosition);

  if (mouseoverPosition < 0) return null;

  const maxTranscriptWidth = maximumPosition - minimumPosition;
  const currentGenomePosition = Math.floor(minimumPosition + (maxTranscriptWidth * mouseoverPosition) / 100);

  return (
    <div className={classes.transcriptPositionLineContainer}>
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${mouseoverPosition}%`,
          transform: mouseoverPosition >= 50 ? 'translate(-12rem, -2rem)' : 'translate(-1rem, -2rem)',
        }}
      >
        {`Go to ${currentGenomePosition.toLocaleString()}`}
      </div>
      <div
        className={classes.transcriptPositionLine}
        style={{
          left: mouseoverPosition > 99.6 ? '100%' : `${mouseoverPosition}%`,
          opacity: 0.5,
        }}
      />
    </div>
  );
};

const Transcripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  const { maximumPosition, minimumPosition } = transcriptsData;

  const dispatch = useDispatch();

  // Reset positions on entry
  useEffect(() => {
    // WOOP
    // dispatch(setGeneBrowserScrollJumpPositionPercent(0));
    dispatch(setGeneBrowserMouseoverScrollPosition(-1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptsData]);

  return (
    <section className={classes.transcriptsOverviewContainer} id='transcriptsOverviewContainer'>
      {transcriptsData.transcripts.map((transcript) => (
        <div className={classes.transcriptOverview} key={transcript.transcriptId}>
          <div className={classes.transcriptIdContainer}>
            <div
              className={classes.transcriptIdCondition}
              style={{ backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2' }}
            >
              {filters.condition}
            </div>
            <p className={classes.transcriptId}>{transcript.transcriptId}</p>
          </div>
          <Transcript
            transcriptData={{
              transcript: transcript,
              minimumPosition: transcriptsData.minimumPosition,
              maximumPosition: transcriptsData.maximumPosition,
            }}
          />
        </div>
      ))}
      <CurrentPositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
      <MouseoverPositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
    </section>
  );
};

export default Transcripts;
