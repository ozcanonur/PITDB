import { useSelector } from 'react-redux';

import { TranscriptsResponse } from '../types';
import { useStyles } from './styles';

import Transcript from '../Transcript/Transcript';

const Transcripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const { scrollPosition } = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const maxTranscriptWidth = transcriptsData.maximumPosition - transcriptsData.minimumPosition;

  const currentGenomePosition = Math.floor(
    transcriptsData.minimumPosition + (maxTranscriptWidth * scrollPosition) / 100
  );

  return (
    <div className={classes.transcriptsOverviewContainer}>
      {transcriptsData.transcripts.map((transcript) => (
        <div className={classes.transcriptOverview} key={transcript.transcriptId}>
          <div className={classes.transcriptIdContainer} style={{ width: '23.5rem' }}>
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
      {/* WOOP, hardcoded */}
      <div
        style={{
          position: 'absolute',
          height: '100%',
          left: '27.4rem',
          top: 0,
          width: 'calc(100% - 27.4rem - 2rem)',
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
            left: `${scrollPosition}%`,
            height: 'calc(100% + 2rem)',
          }}
        />
      </div>
    </div>
  );
};

export default Transcripts;
