import { memo } from 'react';
import { useSelector } from 'react-redux';

import Transcript from 'components/Project/GeneBrowser/GeneBrowser/Transcript/Transcript';

import { useStyles } from './styles';
import { TranscriptsResponse } from '../../types';

// Making this a separate component to avoid re-renders on transcripts svg
// Since we only need to re-render the line's position on scrollPos change
const TranscriptTooltipPositionLine = () => {
  const classes = useStyles();

  const scrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  return (
    <div
      className={classes.transcriptPositionLine}
      style={{
        left: `${scrollPosition}%`,
      }}
    />
  );
};

const Tooltip = memo(({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  return (
    <div className={classes.scrollTooltipContainer}>
      <div className={classes.transcriptTooltipRails}>
        <div className={classes.tooltipTranscripts}>
          {transcripts.map((transcript) => (
            <Transcript
              key={transcript.transcriptId}
              transcriptData={{
                transcript: transcript,
                minimumPosition,
                maximumPosition,
              }}
            />
          ))}
        </div>
        <TranscriptTooltipPositionLine />
      </div>
    </div>
  );
});

export default Tooltip;
