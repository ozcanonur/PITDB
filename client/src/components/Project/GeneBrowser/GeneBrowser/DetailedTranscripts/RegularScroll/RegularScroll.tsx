import { forwardRef, memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Transcript from 'components/Project/GeneBrowser/GeneBrowser/Transcript/Transcript';

import { RegularScrollProps, TooltipProps, Transcript as TranscriptData } from '../../../types';
import { useStyles } from './styles';

// Making this a separate pure component to avoid re-renders on transcripts svg on position line change
const Transcripts = memo(({ transcripts }: { transcripts: TranscriptData[] }) => {
  const classes = useStyles();

  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  const visibleTranscripts = transcriptVisibility
    .filter(({ isVisible }) => isVisible)
    .map(({ transcriptId }) => transcriptId);

  return (
    <div className={classes.tooltipTranscripts}>
      {transcripts.map((transcript) =>
        visibleTranscripts.includes(transcript.transcriptId) ? (
          <Transcript key={transcript.transcriptId} transcript={transcript} isTooltip={true} />
        ) : null
      )}
    </div>
  );
});

const ScrollTooltip = ({ tooltipStyles, tooltipOpen }: TooltipProps) => {
  const classes = useStyles();

  const { transcripts, minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptScrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const percentageScrolled =
    ((transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition + 1)) * 100;

  return (
    <div
      className={classes.scrollTooltipContainer}
      style={{ ...tooltipStyles, display: tooltipOpen ? 'inherit' : 'none' }}
    >
      <div className={classes.transcriptTooltipRails}>
        <Transcripts transcripts={transcripts} />
        <div
          className={classes.transcriptPositionLine}
          style={{
            left: `${percentageScrolled}%`,
          }}
        />
      </div>
    </div>
  );
};

const RegularScroll = forwardRef(
  (
    {
      handleScroll,
      width,
      tooltipStyles,
      scrollStyles,
      tooltipPortalTo,
      hasTooltip = false,
    }: RegularScrollProps,
    ref: any
  ) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const classes = useStyles();

    let timeout = useRef<NodeJS.Timeout>();

    const onScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        handleScroll(e);

        // @ts-ignore
        clearTimeout(timeout.current);

        setTooltipOpen(true);

        timeout.current = setTimeout(() => {
          setTooltipOpen(false);
        }, 500);
      },
      [handleScroll]
    );

    return (
      <div className={classes.scrollContainer} onScroll={onScroll} ref={ref} style={{ ...scrollStyles }}>
        <div
          className={classes.scroll}
          style={{
            width,
          }}
        />
        {hasTooltip ? (
          <ScrollTooltip portalTo={tooltipPortalTo} tooltipStyles={tooltipStyles} tooltipOpen={tooltipOpen} />
        ) : null}
      </div>
    );
  }
);

export default RegularScroll;
