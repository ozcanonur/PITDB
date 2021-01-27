import { useState, useRef, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DetailedTranscriptsScrollTooltip from 'components/Project/GeneBrowser/TranscriptViewer/DetailedTranscriptViewer/DetailedTranscriptsScrollTooltip/DetailedTranscriptsScrollTooltip';
import DetailedTranscriptSvg from './DetailedTranscriptSvg/DetailedTranscriptSvg';

import { useStyles } from './styles';
import { TranscriptsResponse } from '../types';
import { setGeneBrowserScrollPosition } from 'actions';

const Tooltip = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const { scrollPosition } = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const maxTranscriptWidth = transcriptsData.maximumPosition - transcriptsData.minimumPosition;

  const currentGenomePosition = Math.floor(
    transcriptsData.minimumPosition + (maxTranscriptWidth * scrollPosition) / 100
  );

  const TranscriptsSvg = useMemo(() => {
    return (
      <>
        {transcriptsData.transcripts.map((transcript) => (
          <DetailedTranscriptsScrollTooltip
            key={transcript.transcriptId}
            transcriptData={{
              transcript: transcript,
              minimumPosition: transcriptsData.minimumPosition,
              maximumPosition: transcriptsData.maximumPosition,
            }}
          />
        ))}
      </>
    );
  }, [transcriptsData]);

  return (
    <div className={classes.scrollTooltipContainer}>
      <div className={classes.transcriptTooltipRails}>
        {TranscriptsSvg}
        <div
          className={classes.transcriptPositionLine}
          style={{
            left: `${scrollPosition}%`,
          }}
        />
      </div>
      <p className={classes.tooltipPositionText}>{`Current position: ${currentGenomePosition}`}</p>
    </div>
  );
};

const Transcripts = memo(({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  return (
    <>
      {transcriptsData.transcripts.map((transcript, index) => {
        // if (index > 0) return null;

        return (
          <div className={classes.detailedTranscriptContainer} key={transcript.transcriptId}>
            <DetailedTranscriptSvg
              transcriptData={{
                transcript,
                minimumPosition: transcriptsData.minimumPosition,
                maximumPosition: transcriptsData.maximumPosition,
              }}
            />
          </div>
        );
      })}
    </>
  );
});

const TranscriptNames = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  return (
    <>
      {transcriptsData.transcripts.map(({ transcriptId, conditions, cds }, index) => {
        // if (index > 0) return null;

        const cdsLineCount = cds?.length || 0;
        const peptideLineCount =
          (cds && cds?.map(({ peptides }) => peptides).filter((e) => e !== undefined).length) || 0;

        const transcriptInfoHeight = 3 + cdsLineCount * 3 + peptideLineCount * 3;

        // WOOP, hardcoded condition colors
        // WOOP, hardcoded condition number on width 8.5rem => 4rem each with 0.5 margin between
        return (
          <div
            key={transcriptId}
            className={classes.transcriptInfo}
            style={{ height: `${transcriptInfoHeight}rem` }}
          >
            <div className={classes.transcriptId}>
              <div className={classes.transcriptIdConditions} style={{ width: '8.5rem' }}>
                {conditions.map(({ condition }) => (
                  <div
                    key={condition}
                    className={classes.transcriptIdCondition}
                    style={{ backgroundColor: condition === 'Nsi' ? '#336' : '#6b88a2' }}
                  >
                    {condition}
                  </div>
                ))}
              </div>
              <p className={classes.transcriptIdText}>{transcriptId}</p>
            </div>
            <div className={classes.cdssContainer}>
              {cds?.map(({ strand }, index) => {
                const isReverse = strand === '-';

                return (
                  <p key={index} className={classes.transcriptIdText}>{`CDS, ${
                    isReverse ? 'reverse' : 'forward'
                  } strand`}</p>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

const DetailedTranscriptViewer = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { boxHeight } = useSelector((state: RootState) => state.geneBrowserBoxHeight);

  const scrollRef = useRef(null);

  let timeout = useRef<NodeJS.Timeout>();

  const dispatch = useDispatch();

  const handleScroll = () => {
    if (!scrollRef || !scrollRef.current) return;

    // @ts-ignore
    clearTimeout(timeout.current);

    const maxTranscriptWidth = transcriptsData.maximumPosition - transcriptsData.minimumPosition;
    const widthOnScreen = maxTranscriptWidth * boxHeight;

    // @ts-ignore
    dispatch(setGeneBrowserScrollPosition((scrollRef.current.scrollLeft / widthOnScreen) * 100));

    setTooltipOpen(true);

    timeout.current = setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

  return (
    <div className={classes.detailedTranscriptViewerContainer}>
      <div className={classes.transcriptsInfoContainer}>
        <TranscriptNames transcriptsData={transcriptsData} />
      </div>
      <div style={{ width: '100%', transform: 'translateZ(0)' }}>
        <div className={classes.detailedTranscripts} ref={scrollRef} onScroll={handleScroll}>
          <Transcripts transcriptsData={transcriptsData} />
          {tooltipOpen ? <Tooltip transcriptsData={transcriptsData} /> : null}
        </div>
      </div>
    </div>
  );
};

export default DetailedTranscriptViewer;
