import { memo } from 'react';
import { useSelector } from 'react-redux';

import Transcript from 'components/Project/GeneBrowser/GeneBrowser/Transcript/Transcript';

import { useStyles } from './styles';
import { Transcript as TranscriptForProps, TranscriptsResponse } from '../../types';
import usePortal from 'react-useportal';

// Making this a separate component to avoid re-renders on transcripts svg
// Since we only need to re-render the line's position and text on scrollPos change
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

const Transcripts = memo(
  ({
    transcripts,
    minimumPosition,
    maximumPosition,
  }: {
    transcripts: TranscriptForProps[];
    minimumPosition: number;
    maximumPosition: number;
  }) => {
    const classes = useStyles();

    return (
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
    );
  }
);

const Tooltip = ({
  transcriptsData,
  position,
}: {
  transcriptsData: TranscriptsResponse;
  position: 'top' | 'bottom';
}) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  const tooltipCssPosition: any =
    position === 'bottom' ? { bottom: '7.3rem', left: '30rem' } : { position: 'absolute', bottom: '-1.5rem' };

  const portalToId = position === 'bottom' ? 'geneBrowserContainer' : 'transcriptsOverviewContainer';

  const { Portal } = usePortal({
    bindTo: document.getElementById(portalToId) || undefined,
  });

  return (
    <Portal>
      <div className={classes.scrollTooltipContainer} style={tooltipCssPosition}>
        <div className={classes.transcriptTooltipRails}>
          <Transcripts
            transcripts={transcripts}
            minimumPosition={minimumPosition}
            maximumPosition={maximumPosition}
          />
          <TranscriptTooltipPositionLine />
        </div>
      </div>
    </Portal>
  );
};

export default Tooltip;
