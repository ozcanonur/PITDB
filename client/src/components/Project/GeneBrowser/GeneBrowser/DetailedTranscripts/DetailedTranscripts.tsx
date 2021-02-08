import React, { useEffect, useRef, useMemo, ChangeEvent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragScroll from 'react-indiana-drag-scroll';
import AutoSizer from 'react-virtualized-auto-sizer';
import range from 'lodash/range';

import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import RegularScroll from './RegularScroll/RegularScroll';

import { DetailedTranscriptsVirtualListProps } from '../../types';
import {
  setGeneBrowserBoxHeight,
  setGeneBrowserScrollJumpPosition,
  setGeneBrowserScrollPosition,
} from 'actions';
import { makeVirtualizedListRefsList, scrollVirtualRefs, parseDiscreteSliderMarks } from './helpers';
import { useStyles } from './styles';

const DetailedTranscriptVirtualLists = memo(
  ({ virtualizedListRefsList }: DetailedTranscriptsVirtualListProps) => {
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
      <div className={classes.detailedTranscripts}>
        {visibleTranscripts.map((transcript, index) => (
          <DetailedTranscript
            key={transcript.transcriptId}
            transcript={transcript}
            refs={virtualizedListRefsList[index]}
          />
        ))}
      </div>
    );
  }
);

const TranscriptIndex = () => {
  const classes = useStyles();

  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);
  const { minimumPosition } = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
  const transcriptScrollPosition =
    useSelector((state: RootState) => state.geneBrowserScrollPosition) || minimumPosition;

  return (
    <div
      className={classes.transcriptIndexContainer}
      style={{
        height: boxHeight + 15,
        transform: `translateY(${-boxHeight / 2}px)`,
      }}
    >
      <AutoSizer className={classes.transcriptIndex}>
        {({ width, height }) =>
          range(0, Math.ceil(width / boxHeight / 3)).map((index) => (
            <p
              key={(transcriptScrollPosition + index * 3).toLocaleString()}
              className={classes.transcriptIndexText}
              style={{
                minWidth: boxHeight * 3,
                fontSize: boxHeight / 2 - 1,
                height,
              }}
            >
              {(transcriptScrollPosition + index * 3).toLocaleString()}
            </p>
          ))
        }
      </AutoSizer>
    </div>
  );
};

const DetailedTranscripts = memo(() => {
  const classes = useStyles();

  const transcriptsData = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);
  const scrollJumpPosition = useSelector((state: RootState) => state.geneBrowserScrollJumpPosition);
  const transcriptScrollPosition =
    useSelector((state: RootState) => state.geneBrowserScrollPosition) || minimumPosition;

  /* We are going to pass down refs to the detailed transcript children virtualized lists
   * So that we can control their scroll status from this component
   * Storing the scroll position 'as a state' would re-render detailed transcripts
   * Which is very performance heavy
   * First, generate the refs
   */
  const virtualizedListRefsList = useMemo(() => makeVirtualizedListRefsList(transcripts), [transcripts]);
  const dragScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Throttle the virtual list scrolls because it's expensive
  // Not too much though or the scroll will be 10fps
  const handleDragScroll = useCallback(
    (scrollLeft: number) => {
      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

      // And scroll regular bottom scroll element
      if (!bottomScrollRef.current) return;
      bottomScrollRef.current.scrollTo({ left: scrollLeft });

      const totalTranscriptWidthInPixels = (maximumPosition - minimumPosition + 1) * boxHeight;
      const percentageScrolled = scrollLeft / totalTranscriptWidthInPixels;

      const transcriptGenomeWidth = maximumPosition - minimumPosition + 1;

      const currentTranscriptPosition = Math.floor(
        minimumPosition + transcriptGenomeWidth * percentageScrolled
      );

      // Change the position line indicator
      dispatch(setGeneBrowserScrollPosition(currentTranscriptPosition));
      dispatch(setGeneBrowserScrollJumpPosition(currentTranscriptPosition));
    },
    [boxHeight, dispatch, maximumPosition, minimumPosition, virtualizedListRefsList]
  );

  const handleRegularScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // @ts-ignore
    const scrollLeft = e.target.scrollLeft;

    // Scroll drag scroll element
    // All other scrolls will be done via handleDragScroll indirectly
    if (!dragScrollRef.current) return;
    dragScrollRef.current.scrollTo({ left: scrollLeft });
  }, []);

  // Scroll to the current transcript position on box height change
  // Have to do this because the width etc. changes
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    const positionOffset = transcriptScrollPosition - minimumPosition;
    const percentageScrolled = positionOffset / (maximumPosition - minimumPosition + 1);

    const totalTranscriptWidthInPixels = (maximumPosition - minimumPosition + 1) * boxHeight;
    const scrollLeft = percentageScrolled * totalTranscriptWidthInPixels;

    bottomScrollRef.current.scrollTo({ left: scrollLeft });
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxHeight]);

  // Jump to a position whenever the user clicks on a position on top transcripts overview
  useEffect(() => {
    if (!bottomScrollRef.current || scrollJumpPosition === transcriptScrollPosition) return;

    dispatch(setGeneBrowserScrollPosition(scrollJumpPosition));

    const transcriptPercentagePosition =
      (scrollJumpPosition - minimumPosition) / (maximumPosition - minimumPosition + 1);

    const totalTranscriptWidthInPixels = (maximumPosition - minimumPosition + 1) * boxHeight;

    const scrollLeft = totalTranscriptWidthInPixels * transcriptPercentagePosition;

    bottomScrollRef.current.scrollTo({ left: scrollLeft });
    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimumPosition, scrollJumpPosition]);

  // Scroll newly added visible transcripts to the current position
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    const { scrollLeft } = bottomScrollRef.current;

    // Need to wait for them to render&change DOM first
    // For some reason useLayoutEffect didn't work
    // 100 is an arbitrary number, 15 works on my machine
    // Other machines can be slower though
    setTimeout(() => {
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptVisibility]);

  const zoomLevelMarks = ['5', '10', '20', '30', '40'];
  const zoomLevelOnChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newBoxHeight = parseFloat(zoomLevelMarks[value]);

    if (newBoxHeight === boxHeight) return;

    dispatch(setGeneBrowserBoxHeight(newBoxHeight));
  };

  return (
    <section className={classes.detailedTranscriptViewerContainer}>
      <DiscreteSlider
        onChangeCommited={zoomLevelOnChangeCommited}
        name='Zoom Level'
        defaultValue={zoomLevelMarks.indexOf(boxHeight.toString())}
        marks={parseDiscreteSliderMarks(zoomLevelMarks)}
        className={classes.zoomSlider}
      />
      {/* This is the current transcript position index on top */}
      <TranscriptIndex />
      {/* These are the actual transcripts */}
      <DetailedTranscriptVirtualLists virtualizedListRefsList={virtualizedListRefsList} />
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
            width: (maximumPosition - minimumPosition + 1) * boxHeight,
          }}
        />
      </DragScroll>
      {/* This is for bottom regular scroll on the transcripts
       *  We have to do this (create a new component) because hideScrollbars={false} on ScrollContainer library is buggy
       */}
      <RegularScroll
        handleScroll={handleRegularScroll}
        ref={bottomScrollRef}
        width={(maximumPosition - minimumPosition + 1) * boxHeight}
      />
    </section>
  );
});

export default DetailedTranscripts;
