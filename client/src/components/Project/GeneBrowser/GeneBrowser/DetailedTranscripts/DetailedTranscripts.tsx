import { useState, useRef, memo, useMemo, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DetailedTranscriptsScrollTooltip from 'components/Project/GeneBrowser/GeneBrowser/Transcript/Transcript';
import DetailedTranscriptVirtual from '../DetailedTranscriptVirtual/DetailedTranscriptVirtual';

import { useStyles } from './styles';
import { TranscriptsResponse } from '../../types';
import { setGeneBrowserScrollPosition } from 'actions';
import React from 'react';

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

const DetailedTranscripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  // const [tooltipOpen, setTooltipOpen] = useState(false);

  // let timeout = useRef<NodeJS.Timeout>();

  // const handleScroll = () => {
  //   if (!scrollRef || !scrollRef.current) return;

  //   // @ts-ignore
  //   clearTimeout(timeout.current);

  //   setTooltipOpen(true);

  //   timeout.current = setTimeout(() => {
  //     setTooltipOpen(false);
  //   }, 500);
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollMes = document.querySelectorAll('[data-scroll]');

    if (scrollMes.length === 0) return;

    const scrollLeft = e.currentTarget.scrollLeft;

    for (let i = 0; i < scrollMes.length; i++) {
      const scrollMe = scrollMes[i];
      scrollMe.scrollTo({ left: scrollLeft });
    }

    const maxTranscriptWidth = transcriptsData.maximumPosition - transcriptsData.minimumPosition;
    const widthOnScreen = maxTranscriptWidth * 30;

    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));
  };

  return (
    <div className={classes.detailedTranscriptViewerContainer}>
      <div className={classes.transcriptsInfoContainer}>
        <TranscriptNames transcriptsData={transcriptsData} />
      </div>
      <div
        style={{
          transform: 'translateZ(0)',
          width: 'calc((100% - 24rem) - 2rem)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={classes.detailedTranscripts}>
          {transcriptsData.transcripts.map((transcript, index) => {
            // if (index > 0) return null;

            return (
              <div className={classes.detailedTranscriptContainer} key={transcript.transcriptId}>
                <DetailedTranscriptVirtual
                  transcriptData={{
                    transcript,
                    minimumPosition: transcriptsData.minimumPosition,
                    maximumPosition: transcriptsData.maximumPosition,
                  }}
                />
              </div>
            );
          })}
          {false ? <Tooltip transcriptsData={transcriptsData} /> : null}
        </div>
      </div>
      <div
        style={{
          width: 'calc((100% - 28rem) - 2rem)',
          position: 'absolute',
          bottom: 0,
          left: '28rem',
          height: 18,
          overflow: 'auto',
        }}
        onScroll={handleScroll}
      >
        <div
          style={{
            width: (transcriptsData.maximumPosition - transcriptsData.minimumPosition + 1) * 30,
            height: 1,
          }}
        />
      </div>
    </div>
  );
};

export default DetailedTranscripts;
