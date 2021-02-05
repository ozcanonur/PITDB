import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragScroll from 'react-indiana-drag-scroll';
import debounce from 'lodash/debounce';

import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import RegularScroll from './RegularScroll/RegularScroll';

import { useStyles } from './styles';
import { TranscriptsResponse } from '../../types';
import { setGeneBrowserScrollPosition } from 'actions';
import { makeVirtualizedListRefsList, scrollVirtualRefs } from './helpers';

const BOX_HEIGHT = 30;

const DetailedTranscripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);

  const visibleTranscripts = transcriptVisibility
    .filter(({ isVisible }) => isVisible)
    .map(({ transcriptId }) => transcriptId);

  // When the user clicks on a position on the top transcripts overview
  const scrollJumpPosition = useSelector((state: RootState) => state.geneBrowserScrollJumpPositionPercent);

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  /* We are going to pass down refs to the detailed transcript children virtualized lists
   * So that we can control their scroll status from this component
   * First, generate the refs
   */
  const virtualizedListRefsList = useMemo(() => makeVirtualizedListRefsList(transcripts), [transcripts]);

  const dragScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Debounce to not change redux state too quick
  const debounceDispatch = debounce(dispatch, 10);

  const handleDragScroll = useCallback(
    (scrollLeft: number) => {
      const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;

      // Change the position line indicator
      debounceDispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

      // And scroll regular bottom scroll element
      if (!bottomScrollRef.current) return;
      bottomScrollRef.current.scrollTo({ left: scrollLeft });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maximumPosition, minimumPosition, virtualizedListRefsList]
  );

  const handleRegularScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const scrollLeft = e.currentTarget.scrollLeft;

      // Scroll drag scroll element
      // All other scrolls will be done via handleDragScroll indirectly
      if (!dragScrollRef.current) return;
      dragScrollRef.current.scrollTo({ left: scrollLeft });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maximumPosition, minimumPosition, virtualizedListRefsList]
  );

  // Jump to a position whenever the user clicks on a position on top transcripts overview
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    let scrollPosition = scrollJumpPosition.scrollPosition;

    const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;

    if (scrollPosition > 1)
      scrollPosition = (scrollPosition - minimumPosition) / (maximumPosition - minimumPosition);

    const scrollLeft = widthOnScreen * scrollPosition - BOX_HEIGHT;

    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

    // topScrollRef.current.scrollTo({ left: scrollLeft });
    bottomScrollRef.current.scrollTo({ left: scrollLeft });

    // Have to add a small delay or virtual lists won't scroll
    setTimeout(() => {
      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    }, 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollJumpPosition]);

  // Reset the position on unmount
  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll newly added visible transcripts to the current position
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    const { scrollLeft } = bottomScrollRef.current;

    // Need to wait for them to render first
    // 100 is an arbitrary number, 15 works on my machine
    // Other machines can be slower though
    setTimeout(() => {
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptVisibility]);

  return (
    <section className={classes.detailedTranscriptViewerContainer}>
      {/* These are the actual transcripts */}
      <div className={classes.detailedTranscripts}>
        {transcripts.map((transcript, index) =>
          visibleTranscripts.includes(transcript.transcriptId) ? (
            <DetailedTranscript
              key={index}
              transcriptData={{
                transcript,
                minimumPosition,
                maximumPosition,
              }}
              refs={virtualizedListRefsList[index]}
            />
          ) : null
        )}
      </div>
      {/* This is for drag scroll on the transcripts, scroll-container class is library req. */}
      <DragScroll
        className={`${classes.scrollDragContainer} scroll-container`}
        onScroll={handleDragScroll}
        activationDistance={2}
        innerRef={dragScrollRef}
      >
        <div
          className={classes.scroll}
          style={{
            width: (maximumPosition - minimumPosition + 1) * BOX_HEIGHT,
          }}
        />
      </DragScroll>
      {/* This is for bottom regular scroll on the transcripts
       *  We have to do this because hideScrollbars={false} on ScrollContainer library is buggy
       */}
      <RegularScroll
        transcriptsData={transcriptsData}
        handleScroll={handleRegularScroll}
        ref={bottomScrollRef}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
        scrollStyles={{ bottom: 0 }}
        hasTooltip={true}
        tooltipStyles={{ position: 'fixed', bottom: '2.3rem' }}
      />
    </section>
  );
};

export default DetailedTranscripts;
