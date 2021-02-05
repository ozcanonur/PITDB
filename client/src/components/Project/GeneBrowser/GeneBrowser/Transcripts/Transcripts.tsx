import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import { TranscriptsResponse, PositionLineProps } from '../../types';
import { useStyles } from './styles';
import { setGeneBrowserMouseoverScrollPosition, setGeneBrowserTranscriptVisibility } from 'actions';

import Transcript from '../Transcript/Transcript';

const CurrentPositionLine = ({ maximumPosition, minimumPosition }: PositionLineProps) => {
  const classes = useStyles();

  const transcriptScrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  if (!transcriptVisibility.find(({ isVisible }) => isVisible)) return null;

  const percentageScrolled =
    ((transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition + 1)) * 100;

  return (
    <div className={classes.transcriptPositionLineContainer}>
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${percentageScrolled}%`,
          transform: percentageScrolled >= 50 ? 'translateX(-16.4rem)' : 'none',
        }}
      >
        {`You are at ${transcriptScrollPosition.toLocaleString()}`}
      </div>
      <div
        className={classes.transcriptPositionLine}
        style={{
          left: `${percentageScrolled}%`,
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
          left: `${mouseoverPosition}%`,
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

  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  const { maximumPosition, minimumPosition } = transcriptsData;

  const dispatch = useDispatch();

  // Reset positions on entry
  useEffect(() => {
    dispatch(setGeneBrowserMouseoverScrollPosition(-1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptsData]);

  const hideTranscript = useCallback((transcriptId: string) => {
    dispatch(setGeneBrowserTranscriptVisibility([{ transcriptId, isVisible: false }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTranscript = useCallback((transcriptId: string) => {
    dispatch(setGeneBrowserTranscriptVisibility([{ transcriptId, isVisible: true }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleTranscriptIds = transcriptVisibility
    .filter(({ isVisible }) => isVisible)
    .map(({ transcriptId }) => transcriptId);

  return (
    <section className={classes.transcriptsOverviewContainer} id='transcriptsOverviewContainer'>
      {transcriptsData.transcripts.map((transcript) => (
        <div className={classes.transcriptOverview} key={transcript.transcriptId}>
          <div className={classes.transcriptIdContainer}>
            {visibleTranscriptIds.includes(transcript.transcriptId) ? (
              <div className={classes.hideTranscriptButtonContainer}>
                <IconButton
                  className={classes.hideTranscriptButton}
                  aria-label='hide transcript'
                  component='span'
                  onClick={() => hideTranscript(transcript.transcriptId)}
                  title='Hide transcript'
                >
                  <RemoveIcon className={classes.hideTranscriptButtonIcon} />
                </IconButton>
              </div>
            ) : (
              <div className={classes.hideTranscriptButtonContainer}>
                <IconButton
                  aria-label='show transcript'
                  component='span'
                  className={classes.showTranscriptButton}
                  onClick={() => showTranscript(transcript.transcriptId)}
                  title='Show transcript'
                >
                  <AddIcon className={classes.hideTranscriptButtonIcon} />
                </IconButton>
              </div>
            )}
            <div
              className={classes.transcriptIdCondition}
              style={{ backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2' }}
            >
              {filters.condition}
            </div>
            <p className={classes.transcriptId}>{transcript.transcriptId}</p>
          </div>
          {visibleTranscriptIds.includes(transcript.transcriptId) ? (
            <Transcript
              transcriptData={{
                transcript: transcript,
                minimumPosition: transcriptsData.minimumPosition,
                maximumPosition: transcriptsData.maximumPosition,
              }}
            />
          ) : null}
        </div>
      ))}
      <CurrentPositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
      <MouseoverPositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
    </section>
  );
};

export default Transcripts;
