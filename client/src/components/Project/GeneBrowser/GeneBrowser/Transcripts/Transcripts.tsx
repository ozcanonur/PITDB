import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import partition from 'lodash/partition';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';

import { useStyles } from './styles';
import { setGeneBrowserMouseoverScrollPosition, setGeneBrowserTranscriptVisibility } from 'actions';

import Transcript from '../Transcript/Transcript';

const CurrentPositionLine = ({ hiddenTranscriptsVisible }: { hiddenTranscriptsVisible: boolean }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptScrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  if (!transcriptVisibility.find(({ isVisible }) => isVisible)) return null;

  const percentageScrolled =
    ((transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition + 1)) * 100;

  const notVisibleTranscriptCount = transcriptVisibility.filter(({ isVisible }) => !isVisible).length;

  return (
    <div
      className={classes.transcriptPositionLineContainer}
      style={{
        height: hiddenTranscriptsVisible
          ? `calc(100% - ${notVisibleTranscriptCount * 32 + (notVisibleTranscriptCount - 1) * 10}px)`
          : 'calc(100% + 1rem)',
      }}
    >
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

const MouseoverPositionLine = ({ hiddenTranscriptsVisible }: { hiddenTranscriptsVisible: boolean }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  const mouseoverPosition = useSelector((state: RootState) => state.geneBrowserMouseoverPosition);

  if (mouseoverPosition < 0) return null;

  const maxTranscriptWidth = maximumPosition - minimumPosition;
  const currentGenomePosition = Math.floor(minimumPosition + (maxTranscriptWidth * mouseoverPosition) / 100);

  const notVisibleTranscriptCount = transcriptVisibility.filter(({ isVisible }) => !isVisible).length;

  return (
    <div
      className={classes.transcriptPositionLineContainer}
      style={{
        height: hiddenTranscriptsVisible
          ? `calc(100% - ${notVisibleTranscriptCount * 32 + (notVisibleTranscriptCount - 1) * 10}px)`
          : 'calc(100% + 1rem)',
      }}
    >
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

const Transcripts = () => {
  const classes = useStyles();

  const transcriptsData = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  const [hiddenTranscriptsVisible, setHiddenTranscriptsVisible] = useState(true);

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
    setHiddenTranscriptsVisible(false);
  };

  const showHiddenTranscripts = () => {
    setHiddenTranscriptsVisible(true);
  };

  return (
    <>
      {hiddenTranscriptsVisible ? (
        <IconButton
          className={classes.collapseHidddenTranscriptsButton}
          aria-label='Collapse hidden transcripts'
          component='span'
          onClick={collapseHiddenTranscripts}
          title='Collapse hidden transcripts'
        >
          <span>Collapse Hidden</span>
          <VisibilityOffIcon className={classes.hideTranscriptButtonIcon} />
        </IconButton>
      ) : (
        <IconButton
          className={classes.collapseHidddenTranscriptsButton}
          aria-label='show hidden transcripts'
          component='span'
          onClick={showHiddenTranscripts}
          title='Show hidden transcripts'
          style={{ animation: visibleTranscripts.length === 0 ? `flash-red 1s infinite` : 'none' }}
        >
          <span>Show Hidden</span>
          <VisibilityIcon className={classes.hideTranscriptButtonIcon} />
        </IconButton>
      )}
      <section className={classes.transcriptsOverviewContainer}>
        <Collapse in={hiddenTranscriptsVisible} mountOnEnter unmountOnExit style={{ marginBottom: 0 }}>
          {notVisibleTranscripts.map((transcript) => (
            <div className={classes.transcriptOverview} key={transcript.transcriptId}>
              <div className={classes.transcriptIdContainer}>
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
                <div
                  className={classes.transcriptIdCondition}
                  style={{ backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2' }}
                >
                  {filters.condition}
                </div>
                <p className={classes.transcriptId}>{transcript.transcriptId}</p>
              </div>
            </div>
          ))}
        </Collapse>
        {transcriptsData.transcripts.map((transcript) => (
          <Fade
            in={visibleTranscriptIds.includes(transcript.transcriptId)}
            unmountOnExit
            mountOnEnter
            key={transcript.transcriptId}
          >
            <div className={classes.transcriptOverview}>
              <div className={classes.transcriptIdContainer}>
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
                <div
                  className={classes.transcriptIdCondition}
                  style={{ backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2' }}
                >
                  {filters.condition}
                </div>
                <p className={classes.transcriptId}>{transcript.transcriptId}</p>
              </div>
              <Transcript transcript={transcript} />
            </div>
          </Fade>
        ))}
        <CurrentPositionLine hiddenTranscriptsVisible={hiddenTranscriptsVisible} />
        <MouseoverPositionLine hiddenTranscriptsVisible={hiddenTranscriptsVisible} />
      </section>
    </>
  );
};

export default Transcripts;

// {
//   transcriptsData.transcripts.map((transcript) => (
//     <div className={classes.transcriptOverview} key={transcript.transcriptId}>
//       <div className={classes.transcriptIdContainer}>
//         {visibleTranscriptIds.includes(transcript.transcriptId) ? (
//           <div className={classes.hideTranscriptButtonContainer}>
//             <IconButton
//               className={classes.hideTranscriptButton}
//               aria-label='hide transcript'
//               component='span'
//               onClick={() => hideTranscript(transcript.transcriptId)}
//               title='Hide transcript'
//             >
//               <RemoveIcon className={classes.hideTranscriptButtonIcon} />
//             </IconButton>
//           </div>
//         ) : (
//           <div className={classes.hideTranscriptButtonContainer}>
//             <IconButton
//               aria-label='show transcript'
//               component='span'
//               className={classes.showTranscriptButton}
//               onClick={() => showTranscript(transcript.transcriptId)}
//               title='Show transcript'
//             >
//               <AddIcon className={classes.hideTranscriptButtonIcon} />
//             </IconButton>
//           </div>
//         )}
//         <div
//           className={classes.transcriptIdCondition}
//           style={{ backgroundColor: filters.condition === conditionTypes[0] ? '#336' : '#6B88A2' }}
//         >
//           {filters.condition}
//         </div>
//         <p className={classes.transcriptId}>{transcript.transcriptId}</p>
//       </div>
//       {visibleTranscriptIds.includes(transcript.transcriptId) ? <Transcript transcript={transcript} /> : null}
//     </div>
//   ));
// }
