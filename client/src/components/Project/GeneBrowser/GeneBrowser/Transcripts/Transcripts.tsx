import { useSelector } from 'react-redux';

import { TranscriptsResponse } from '../../types';
import { useStyles } from './styles';

import Transcript from '../Transcript/Transcript';

// WOOP, hardcoded
const PositionLine = ({
  maximumPosition,
  minimumPosition,
}: {
  maximumPosition: number;
  minimumPosition: number;
}) => {
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

// WOOP, hardcoded
const MouseOverPositionLine = ({
  maximumPosition,
  minimumPosition,
}: {
  maximumPosition: number;
  minimumPosition: number;
}) => {
  const classes = useStyles();

  const mouseoverScrollPosition = useSelector((state: RootState) => state.geneBrowserMouseoverScrollPosition);

  if (mouseoverScrollPosition < 0) return null;

  const maxTranscriptWidth = maximumPosition - minimumPosition;
  const currentGenomePosition = Math.floor(
    minimumPosition + (maxTranscriptWidth * mouseoverScrollPosition) / 100
  );

  return (
    <div className={classes.transcriptPositionLineContainer}>
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${mouseoverScrollPosition}%`,
          transform: mouseoverScrollPosition >= 50 ? 'translateX(-13.3rem)' : 'none',
        }}
      >
        {`Go to ${currentGenomePosition.toLocaleString()}`}
      </div>
      <div
        className={classes.transcriptPositionLine}
        style={{
          left: mouseoverScrollPosition > 99.6 ? '100%' : `${mouseoverScrollPosition}%`,
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
      <PositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
      <MouseOverPositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
    </section>
  );
};

export default Transcripts;
