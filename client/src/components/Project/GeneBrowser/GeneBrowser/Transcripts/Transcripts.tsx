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

  const { scrollPosition } = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const maxTranscriptWidth = maximumPosition - minimumPosition;

  const currentGenomePosition = Math.floor(minimumPosition + (maxTranscriptWidth * scrollPosition) / 100);

  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        left: '28rem',
        top: 0,
        width: 'calc(100% - 28rem - 2rem)',
      }}
    >
      <div
        className={classes.transcriptPositionText}
        style={{
          left: `${scrollPosition}%`,
          transform: scrollPosition >= 50 ? 'translateX(-8.5rem)' : 'none',
        }}
      >
        {currentGenomePosition}
      </div>
      <div
        className={classes.transcriptPositionLine}
        style={{
          left: scrollPosition > 99.6 ? '100%' : `${scrollPosition}%`,
          height: 'calc(100% + 2rem)',
        }}
      />
    </div>
  );
};

const Transcripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const filters = useSelector((state: RootState) => state.geneBrowserFilters);

  const { maximumPosition, minimumPosition } = transcriptsData;

  return (
    <div className={classes.transcriptsOverviewContainer}>
      {transcriptsData.transcripts.map((transcript) => (
        <div className={classes.transcriptOverview} key={transcript.transcriptId}>
          <div className={classes.transcriptIdContainer} style={{ width: '28rem' }}>
            <div
              className={classes.transcriptIdCondition}
              style={{ backgroundColor: filters.condition === 'Nsi' ? '#336' : '#6B88A2' }}
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
            style={{ flexGrow: 1 }}
          />
        </div>
      ))}

      <PositionLine maximumPosition={maximumPosition} minimumPosition={minimumPosition} />
    </div>
  );
};

export default Transcripts;
