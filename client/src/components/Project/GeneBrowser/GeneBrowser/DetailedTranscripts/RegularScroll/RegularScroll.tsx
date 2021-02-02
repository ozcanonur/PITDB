import { forwardRef, memo, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import usePortal from 'react-useportal';

import Transcript from 'components/Project/GeneBrowser/GeneBrowser/Transcript/Transcript';

import { RegularScrollProps, TooltipProps, TranscriptsResponse } from '../../../types';
import { useStyles } from './styles';

export const RegularScroll = forwardRef(
  ({ handleScroll, width, children, ...props }: RegularScrollProps, ref: any) => {
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
      <div className={classes.scrollContainer} onScroll={onScroll} ref={ref} {...props}>
        <div
          className={classes.scroll}
          style={{
            width,
          }}
        />
        {tooltipOpen ? <>{children}</> : null}
      </div>
    );
  }
);

// Making this a separate pure component to avoid re-renders on transcripts svg on position line change
const Transcripts = memo(({ transcripts, minimumPosition, maximumPosition }: TranscriptsResponse) => {
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
});

export const ScrollTooltip = ({ transcriptsData, portalTo, ...props }: TooltipProps) => {
  const classes = useStyles();

  const scrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  // @ts-ignore
  const bindTo = document.getElementById(portalTo);

  const { Portal } = usePortal({
    bindTo: bindTo || undefined,
  });

  return (
    <>
      {portalTo ? (
        <Portal>
          <div className={classes.scrollTooltipContainer} {...props}>
            <div className={classes.transcriptTooltipRails}>
              <Transcripts
                transcripts={transcripts}
                minimumPosition={minimumPosition}
                maximumPosition={maximumPosition}
              />
              <div
                className={classes.transcriptPositionLine}
                style={{
                  left: `${scrollPosition}%`,
                }}
              />
            </div>
          </div>
        </Portal>
      ) : (
        <div className={classes.scrollTooltipContainer} {...props}>
          <div className={classes.transcriptTooltipRails}>
            <Transcripts
              transcripts={transcripts}
              minimumPosition={minimumPosition}
              maximumPosition={maximumPosition}
            />
            <div
              className={classes.transcriptPositionLine}
              style={{
                left: `${scrollPosition}%`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
