import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import partition from 'lodash/partition';
import ReactTooltip from 'react-tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import Transcript from '../Transcript/Transcript';

import { setGeneBrowserMouseoverScrollPosition, setGeneBrowserTranscriptVisibility } from 'actions';
import { useStyles } from './styles';

const CurrentPositionLine = ({ hiddenTranscriptsCollapsed }: { hiddenTranscriptsCollapsed: boolean }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptScrollPosition =
    useSelector((state: RootState) => state.geneBrowserScrollPosition) || minimumPosition;
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  if (!transcriptVisibility.find(({ isVisible }) => isVisible)) return null;

  const notVisibleTranscriptCount = transcriptVisibility.filter(({ isVisible }) => !isVisible).length;

  const percentageScrolled =
    ((transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition + 1)) * 100;

  return (
    <div
      className={classes.transcriptPositionLineContainer}
      style={{
        height: hiddenTranscriptsCollapsed
          ? 'calc(100% + 1rem)'
          : `calc(100% - ${notVisibleTranscriptCount * 32 + (notVisibleTranscriptCount - 1) * 10}px)`,
      }}
    >
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${percentageScrolled}%`,
          transform: percentageScrolled >= 50 ? 'translateX(-17rem)' : 'none',
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

const MouseoverPositionLine = ({ hiddenTranscriptsCollapsed }: { hiddenTranscriptsCollapsed: boolean }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  // This is not the transcript position, rather a % value of how much offset mouseovered from the start
  const mouseoverPosition = useSelector((state: RootState) => state.geneBrowserMouseoverPosition);

  if (mouseoverPosition < 0) return null;

  const maxTranscriptWidth = maximumPosition - minimumPosition + 1;
  const currentGenomePosition = Math.floor(minimumPosition + (maxTranscriptWidth * mouseoverPosition) / 100);

  const notVisibleTranscriptCount = transcriptVisibility.filter(({ isVisible }) => !isVisible).length;

  return (
    <div
      className={classes.transcriptPositionLineContainer}
      style={{
        height: hiddenTranscriptsCollapsed
          ? 'calc(100% + 3rem)'
          : `calc(100% - ${notVisibleTranscriptCount * 32 + (notVisibleTranscriptCount - 1) * 10}px + 2rem)`,
      }}
    >
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${mouseoverPosition}%`,
          transform: mouseoverPosition >= 50 ? 'translateX(-13.5rem)' : 'none',
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

const Transcripts = () => {
  const classes = useStyles();

  const transcriptsData = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  const [hiddenTranscriptsCollapsed, setHiddenTranscriptsCollapsed] = useState(false);

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

  const [visibleTranscripts, notVisibleTranscripts] = partition(
    transcriptsData.transcripts,
    ({ transcriptId }) => visibleTranscriptIds.includes(transcriptId)
  );

  const collapseHiddenTranscripts = () => {
    setHiddenTranscriptsCollapsed(true);
  };

  const showHiddenTranscripts = () => {
    setHiddenTranscriptsCollapsed(false);
  };

  return (
    <>
      {hiddenTranscriptsCollapsed ? (
        <IconButton
          className={classes.collapseHidddenTranscriptsButton}
          aria-label='show hidden transcripts'
          component='span'
          onClick={showHiddenTranscripts}
          title='Show hidden transcripts'
          style={{ animation: visibleTranscripts.length === 0 ? `flash-red 1s infinite` : 'none' }}
        >
          <span>{`Show Hidden (${notVisibleTranscripts.length})`}</span>
          <ExpandMoreIcon className={classes.hideTranscriptButtonIcon} />
        </IconButton>
      ) : (
        <IconButton
          className={classes.collapseHidddenTranscriptsButton}
          aria-label='Collapse hidden transcripts'
          component='span'
          onClick={collapseHiddenTranscripts}
          title='Collapse hidden transcripts'
        >
          <span>{`Collapse hidden (${notVisibleTranscripts.length})`}</span>
          <ExpandLessIcon className={classes.hideTranscriptButtonIcon} />
        </IconButton>
      )}
      <section className={classes.transcriptsOverviewContainer}>
        <Collapse in={!hiddenTranscriptsCollapsed} mountOnEnter unmountOnExit style={{ marginBottom: 0 }}>
          {notVisibleTranscripts.map((transcript) => {
            const { transcriptId, conditions } = transcript;

            const backgroundColor = filters.condition === conditionTypes[0] ? '#336' : '#6B88A2';
            const meanTPM = conditions
              .find(({ condition }) => condition === filters.condition)
              ?.mean.toFixed(3);

            return (
              <div className={classes.transcriptOverview} key={transcriptId}>
                <div className={classes.transcriptIdContainer}>
                  <div className={classes.transcriptIdCondition} style={{ backgroundColor }}>
                    <IconButton
                      aria-label='show transcript'
                      component='span'
                      className={classes.showTranscriptButton}
                      onClick={() => showTranscript(transcriptId)}
                      title='Show transcript'
                    >
                      <VisibilityIcon className={classes.hideTranscriptButtonIcon} />
                    </IconButton>
                    <p data-tip={`Mean TPM: ${meanTPM}`}>{filters.condition}</p>
                    <ReactTooltip />
                  </div>
                  <p className={classes.transcriptId}>{transcriptId}</p>
                </div>
              </div>
            );
          })}
        </Collapse>
        {visibleTranscripts.map((transcript) => {
          const { transcriptId, conditions } = transcript;

          const backgroundColor = filters.condition === conditionTypes[0] ? '#336' : '#6B88A2';
          const meanTPM = conditions
            .find(({ condition }) => condition === filters.condition)
            ?.mean.toFixed(3);

          return (
            <div key={transcriptId}>
              <div className={classes.transcriptOverview}>
                <div className={classes.transcriptIdContainer}>
                  <div className={classes.transcriptIdCondition} style={{ backgroundColor }}>
                    <IconButton
                      className={classes.hideTranscriptButton}
                      aria-label='hide transcript'
                      component='span'
                      onClick={() => hideTranscript(transcriptId)}
                      title='Hide transcript'
                    >
                      <VisibilityOffIcon className={classes.hideTranscriptButtonIcon} />
                    </IconButton>
                    <p data-tip={`Mean TPM: ${meanTPM}`}>{filters.condition}</p>
                    <ReactTooltip />
                  </div>
                  <p className={classes.transcriptId}>{transcriptId}</p>
                </div>
                <Transcript transcript={transcript} />
              </div>
            </div>
          );
        })}
        <CurrentPositionLine hiddenTranscriptsCollapsed={hiddenTranscriptsCollapsed} />
        <MouseoverPositionLine hiddenTranscriptsCollapsed={hiddenTranscriptsCollapsed} />
      </section>
    </>
  );
};

export default Transcripts;
