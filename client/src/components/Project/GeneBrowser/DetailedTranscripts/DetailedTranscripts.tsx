import React, { useEffect, useRef, ChangeEvent, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragScroll from 'react-indiana-drag-scroll';
import AutoSizer from 'react-virtualized-auto-sizer';
import range from 'lodash/range';

import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import RegularScroll from './RegularScroll/RegularScroll';

import {
  setGeneBrowserBoxHeight,
  setGeneBrowserScrollJumpPosition,
  setGeneBrowserScrollPosition,
} from 'actions';
import {
  findTranscriptPositionFromScrollValue,
  findScrollValueFromTranscriptPosition,
  scrollVirtualRefs,
} from './helpers';
import { parseDiscreteSliderMarks } from '../helpers';
import { useStyles } from './styles';

const TranscriptIndex = memo(() => {
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
        {({ width, height }) =>
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
        }
      </AutoSizer>
    </div>
  );
});

const DetailedTranscriptVirtualLists = memo(() => {
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
      {visibleTranscripts.map((transcript) => (
        <DetailedTranscript key={transcript.transcriptId} transcript={transcript} />
      ))}
    </div>
  );
});

const DetailedTranscripts = memo(() => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition } = useSelector(
    (state: RootState) => state.geneBrowserTranscriptsData
  );
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);
  const { pos: scrollJumpPosition } = useSelector((state: RootState) => state.geneBrowserScrollJumpPosition);
  const transcriptScrollPosition =
    useSelector((state: RootState) => state.geneBrowserScrollPosition) || minimumPosition;
  const geneBrowserVirtualRefs = useSelector((state: RootState) => state.geneBrowserVirtualRefs);

  const dragScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleDragScroll = useCallback(
    (scrollLeft: number) => {
      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(geneBrowserVirtualRefs, scrollLeft);

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
    [boxHeight, minimumPosition, geneBrowserVirtualRefs]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxHeight, geneBrowserVirtualRefs]);

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
    scrollVirtualRefs(geneBrowserVirtualRefs, scrollLeft);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimumPosition, scrollJumpPosition]);

  // Scroll newly added visible transcripts to the current position
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    const { scrollLeft } = bottomScrollRef.current;

    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(geneBrowserVirtualRefs, scrollLeft);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptVisibility, geneBrowserVirtualRefs]);

  const zoomLevelMarks = useMemo(() => ['5', '10', '20', '30', '40'], []);
  const zoomLevelOnChangeCommited = useCallback(
    (_event: ChangeEvent<{}>, value: number) => {
      const newBoxHeight = parseFloat(zoomLevelMarks[value]);

      if (newBoxHeight === boxHeight) return;

      dispatch(setGeneBrowserBoxHeight(newBoxHeight));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boxHeight, zoomLevelMarks]
  );

  /* This is to trigger mouseover tooltip on mods
   * Reason for this 'hack' is that we have the drag scroll container all over the browser
   * Which blocks all events for the elements 'under' it
   * Here we check what is the SECOND element at the current mouse (x,y) coordinates
   * And dispatch a mousemove event if it's a polygon(mod/triangle) to trigger the tooltip
   * Or dispatch a mouseout event if the previous element was a polygon(mod) to untrigger to tooltip
   * Events will be caught by the Mod component and trigger their own functions
   * Which are at DetailedTranscript/Mod.tsx
   */
  useEffect(() => {
    let prevBox: Element | null = null;

    const dragScroll = dragScrollRef.current;

    if (!dragScroll) return;

    const dispatchMouseEvent = (e: MouseEvent) => {
      const { x, y } = e;
      const elements = document.elementsFromPoint(x, y);
      const box = elements[1];

      if (!box) return;

      if (box.nodeName === 'polygon') {
        const event = document.createEvent('SVGEvents');
        event.initEvent('mousemove', true, true);
        box.dispatchEvent(event);
        prevBox = box;
      } else if (prevBox) {
        const event = document.createEvent('SVGEvents');
        event.initEvent('mouseout', true, true);
        prevBox.dispatchEvent(event);
        prevBox = null;
      }
    };

    dragScroll.addEventListener('mousemove', dispatchMouseEvent);

    return () => {
      dragScroll.removeEventListener('mousemove', dispatchMouseEvent);
    };
  }, []);

  return (
    <section className={classes.detailedTranscriptViewerContainer}>
      {/* Zoom slider */}
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
      <DetailedTranscriptVirtualLists />
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
