import React, { useState, useCallback, useEffect, memo, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Collapse from '@material-ui/core/Collapse';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import Transcript from '../Transcript/Transcript';

import { setGeneBrowserMouseoverScrollPosition, setGeneBrowserTranscriptVisibility } from 'actions';
import { useStyles } from './styles';

const CurrentPositionLine = () => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptScrollPosition =
    useSelector((state: RootState) => state.geneBrowserScrollPosition) || minimumPosition;
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  if (!transcriptVisibility.find(({ isVisible }) => isVisible)) return null;

  const percentageScrolled =
    ((transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition + 1)) * 100;

  return (
    <div
      className={classes.transcriptPositionLineContainer}
      style={{
        height: 'calc(100% + 1rem)',
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

const MouseoverPositionLine = () => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  // This is not the transcript position, rather a % value of how much offset mouseovered from the start
  const mouseoverPosition = useSelector((state: RootState) => state.geneBrowserMouseoverPosition);

  if (mouseoverPosition < 0) return null;

  const maxTranscriptWidth = maximumPosition - minimumPosition + 1;
  const currentGenomePosition = Math.floor(minimumPosition + (maxTranscriptWidth * mouseoverPosition) / 100);

  return (
    <div
      className={classes.transcriptPositionLineContainer}
      style={{
        height: 'calc(100% + 3rem)',
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

const Transcripts = memo(() => {
  const classes = useStyles();

  const transcriptsData = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
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

  const notvisibleTranscriptIds = transcriptVisibility
    .filter(({ isVisible }) => !isVisible)
    .map(({ transcriptId }) => transcriptId);

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
          style={{ animation: visibleTranscriptIds.length === 0 ? `flash-red 1s infinite` : 'none' }}
        >
          <span>{`Show Hidden (${notvisibleTranscriptIds.length})`}</span>
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
          <span>{`Collapse hidden (${notvisibleTranscriptIds.length})`}</span>
          <ExpandLessIcon className={classes.hideTranscriptButtonIcon} />
        </IconButton>
      )}
      <section className={classes.transcriptsOverviewContainer}>
        <div>
          {transcriptsData.transcripts.map((transcript) => {
            const { transcriptId, conditions } = transcript;

            const isVisible = visibleTranscriptIds.includes(transcriptId);

            return (
              <Collapse
                key={transcriptId}
                in={!hiddenTranscriptsCollapsed || isVisible}
                mountOnEnter
                unmountOnExit
              >
                <div className={classes.transcriptOverview}>
                  <div className={classes.transcriptIdContainer}>
                    <div className={classes.transcriptIdCondition}>
                      <IconButton
                        aria-label={isVisible ? 'Hide transcript' : 'Show transcript'}
                        component='span'
                        className={classes.showTranscriptButton}
                        onClick={
                          isVisible ? () => hideTranscript(transcriptId) : () => showTranscript(transcriptId)
                        }
                        title={isVisible ? 'Hide transcript' : 'Show transcript'}
                      >
                        {isVisible ? (
                          <VisibilityOffIcon className={classes.hideTranscriptButtonIcon} />
                        ) : (
                          <VisibilityIcon className={classes.hideTranscriptButtonIcon} />
                        )}
                      </IconButton>
                      {conditions.map(({ condition }) => {
                        const currentConditionsTPM = conditions.find((e) => e.condition === condition);

                        let meanTPM = '0';
                        let TPMValues: { sample: string; TPM: number }[] = [];
                        if (currentConditionsTPM) {
                          meanTPM = currentConditionsTPM.mean.toFixed(3);
                          TPMValues = currentConditionsTPM.values;
                        }

                        let tooltipText = `${condition}<br />Mean TPM: ${meanTPM}`;
                        TPMValues.forEach(({ sample, TPM }) => {
                          tooltipText += `<br />Sample ${sample}: ${TPM.toFixed(3)}`;
                        });

                        return (
                          <Fragment key={condition}>
                            <div
                              data-tip={tooltipText}
                              className={classes.tooltipContainer}
                              style={{
                                backgroundColor: condition === conditionTypes[0] ? '#336' : '#6B88A2',
                              }}
                            >
                              <p>{condition}</p>
                            </div>
                            <ReactTooltip multiline place='right' />
                          </Fragment>
                        );
                      })}
                    </div>
                    <p className={classes.transcriptId}>{transcriptId}</p>
                  </div>
                  {isVisible ? <Transcript transcript={transcript} /> : null}
                </div>
              </Collapse>
            );
          })}
        </div>
        <CurrentPositionLine />
        <MouseoverPositionLine />
      </section>
    </>
  );
});

export default Transcripts;
