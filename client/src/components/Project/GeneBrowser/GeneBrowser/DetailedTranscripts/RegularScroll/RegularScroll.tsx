import { forwardRef, memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Transcript from 'components/Project/GeneBrowser/GeneBrowser/Transcript/Transcript';

import { RegularScrollProps } from '../../../types';
import { useStyles } from './styles';

const Transcripts = memo(() => {
  const classes = useStyles();

  const { transcripts } = useSelector((state: RootState) => state.geneBrowserTranscriptsData);

  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  const visibleTranscriptIds = transcriptVisibility
    .filter(({ isVisible }) => isVisible)
    .map(({ transcriptId }) => transcriptId);

  const visibleTranscripts = transcripts.filter((transcript) =>
    visibleTranscriptIds.includes(transcript.transcriptId)
  );

  return (
    <div className={classes.tooltipTranscripts}>
      {visibleTranscripts.map((transcript) => (
        <Transcript key={transcript.transcriptId} transcript={transcript} isTooltip={true} />
      ))}
    </div>
  );
});

const ScrollTooltip = ({ tooltipOpen }: { tooltipOpen: boolean }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptScrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const percentageScrolled =
    ((transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition + 1)) * 100;

  return (
    <div className={classes.scrollTooltipContainer} style={{ display: tooltipOpen ? 'inherit' : 'none' }}>
      <div className={classes.transcriptTooltipRails}>
        <Transcripts />
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

const RegularScroll = forwardRef(({ handleScroll, width }: RegularScrollProps, ref: any) => {
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
    <div className={classes.scrollContainer} onScroll={onScroll} ref={ref}>
      <div
        className={classes.scroll}
        style={{
          width,
        }}
      />
      <ScrollTooltip tooltipOpen={tooltipOpen} />
    </div>
  );
});

export default RegularScroll;
