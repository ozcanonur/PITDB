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
import {
  findTranscriptPositionFromScrollValue,
  findScrollValueFromTranscriptPosition,
  makeVirtualizedListRefsList,
  scrollVirtualRefs,
  parseDiscreteSliderMarks,
} from './helpers';
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
        height: (boxHeight * 3) / 2,
        transform: `translateY(${-boxHeight / 2}px)`,
      }}
    >
      <AutoSizer className={classes.transcriptIndex}>
        {
          ({ width, height }) =>
            range(0, Math.ceil(width / boxHeight / 3)).map((index) => (
              <p
                key={(transcriptScrollPosition + index * 3).toLocaleString()}
                className={classes.transcriptIndexText}
                style={{
                  minWidth: boxHeight * 3,
                  fontSize: boxHeight / 2 - 1,
                  height: height,
                }}
              >
                {(transcriptScrollPosition + index * 3).toLocaleString()}
              </p>
            ))
          // This is the relative index for testing
          // range(0, Math.ceil(width / boxHeight / 3)).map((index) => (
          //   <div
          //     key={(transcriptScrollPosition + index * 3).toLocaleString()}
          //     style={{ display: 'flex', flexDirection: 'column' }}
          //   >
          //     <p
          //       className={classes.transcriptIndexText}
          //       style={{
          //         minWidth: boxHeight * 3,
          //         fontSize: boxHeight / 2 - 1,
          //         height: height / 2,
          //       }}
          //     >
          //       {(transcriptScrollPosition + index * 3).toLocaleString()}
          //     </p>
          //     <p
          //       className={classes.transcriptIndexText}
          //       style={{
          //         minWidth: boxHeight * 3,
          //         fontSize: boxHeight / 2 - 1,
          //         height: height / 2,
          //         textAlign: 'start',
          //       }}
          //     >
          //       &nbsp;&nbsp;{transcriptScrollPosition + index * 3 - minimumPosition}
          //     </p>
          //   </div>
          // ))
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

  const handleDragScroll = useCallback(
    (scrollLeft: number) => {
      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

      // And scroll regular bottom scroll element
      if (!bottomScrollRef.current) return;
      bottomScrollRef.current.scrollTo({ left: scrollLeft });

      const currentTranscriptPosition = findTranscriptPositionFromScrollValue(
        scrollLeft,
        minimumPosition,
        maximumPosition,
        boxHeight
      );

      // Change the position line indicator, and sync jump position
      // Jump position syncing is required to make the scroll states persistent across mount/unmounts
      dispatch(setGeneBrowserScrollPosition(currentTranscriptPosition));
      dispatch(setGeneBrowserScrollJumpPosition(currentTranscriptPosition));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boxHeight, maximumPosition, minimumPosition, virtualizedListRefsList]
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

    const scrollLeft = findScrollValueFromTranscriptPosition(
      transcriptScrollPosition,
      minimumPosition,
      maximumPosition,
      boxHeight
    );

    bottomScrollRef.current.scrollTo({ left: scrollLeft });
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxHeight]);

  // Jump to a position whenever the user clicks on a position on top transcripts overview
  useEffect(() => {
    // Don't run if we just 'updated' the scrollJumpPosition via the scrolls
    // Only run if the user actually clicks a completely different position
    if (!bottomScrollRef.current || scrollJumpPosition === transcriptScrollPosition) return;

    dispatch(setGeneBrowserScrollPosition(scrollJumpPosition));

    const scrollLeft = findScrollValueFromTranscriptPosition(
      scrollJumpPosition,
      minimumPosition,
      maximumPosition,
      boxHeight
    );

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

  /* This is to trigger mouseover tooltip on mods
   * Reason for this 'hack' is that we have the drag scroll container all over the browser
   * Which blocks all events for the elements 'under' it
   * Here we check what is the SECOND element at the current mouse (x,y) coordinates
   * And dispatch a mousemove event if it's a polygon(mod) to trigger the tooltip
   * Or dispatch a mouseout event if the previous element was a polygon(mod) to untrigger to tooltip
   * Events will be caught by the polygon and trigger their own functions
   * Which are at DetailedTranscript/Mod.tsx
   */
  useEffect(() => {
    let prevBox: Element;

    dragScrollRef.current?.addEventListener('mousemove', (e) => {
      const { x, y } = e;
      const elements = document.elementsFromPoint(x, y);
      const box = elements[1];
      const event = document.createEvent('SVGEvents');
      if (box.nodeName === 'polygon') {
        event.initEvent('mousemove', true, true);
        box.dispatchEvent(event);
        prevBox = box;
      } else {
        if (!prevBox) return;

        event.initEvent('mouseout', true, true);
        prevBox.dispatchEvent(event);
      }
    });
  }, []);

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
