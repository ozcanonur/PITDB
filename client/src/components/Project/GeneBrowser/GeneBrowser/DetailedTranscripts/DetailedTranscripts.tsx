import React, { useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragScroll from 'react-indiana-drag-scroll';

import { areEqual, VariableSizeList as VirtualizedList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import RegularScroll from './RegularScroll/RegularScroll';

import { useStyles } from './styles';
import { TranscriptsResponse, Transcript, VirtualRef } from '../../types';
import { setGeneBrowserScrollPosition } from 'actions';

import { makeVirtualizedListRefsList, scrollVirtualRefs } from './helpers';
import { debounce } from 'lodash';
import { getTranscriptVisualLineCount } from '../DetailedTranscript/helpers';

const BOX_HEIGHT = 30;

const DetailedTranscriptRenderer = memo(({ index, style, data }: ListChildComponentProps) => {
  const { transcripts, minimumPosition, maximumPosition, refs } = data;

  return (
    <div style={{ ...style, direction: 'rtl' }}>
      <DetailedTranscript
        transcriptData={{
          transcript: transcripts[index],
          minimumPosition,
          maximumPosition,
        }}
        refs={refs[index]}
      />
    </div>
  );
}, areEqual);

const DetailedTranscriptsVirtualList = memo(
  ({
    transcripts,
    minimumPosition,
    maximumPosition,
    virtualizedListRefsList,
  }: {
    transcripts: Transcript[];
    minimumPosition: number;
    maximumPosition: number;
    virtualizedListRefsList: {
      exonRef: VirtualRef;
      cdsRefs?: VirtualRef[][] | undefined;
    }[];
  }) => {
    const getDetailedTranscriptHeight = (index: number) => {
      const heights = transcripts.map(
        (transcript) => getTranscriptVisualLineCount(transcript) * BOX_HEIGHT + 20
      );

      return heights[index];
    };

    return (
      <AutoSizer>
        {({ width, height }) => (
          <VirtualizedList
            height={height}
            itemCount={transcripts.length}
            itemSize={getDetailedTranscriptHeight}
            layout='vertical'
            direction='rtl'
            width={width}
            itemData={{ transcripts, minimumPosition, maximumPosition, refs: virtualizedListRefsList }}
          >
            {DetailedTranscriptRenderer}
          </VirtualizedList>
        )}
      </AutoSizer>
    );
  }
);

const DetailedTranscripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  // When the user clicks on an exon on the transcripts overview
  const scrollJumpPosition = useSelector((state: RootState) => state.geneBrowserScrollJumpPositionPercent);

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  const dispatch = useDispatch();

  /* We are going to pass down refs to the detailed transcript children virtualized lists
   * So that we can control their scroll status from this component
   * First, generate the refs
   */
  const virtualizedListRefsList = useMemo(() => makeVirtualizedListRefsList(transcripts), [transcripts]);

  const dragScrollRef = useRef<HTMLDivElement>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  // Debounce to not change redux state too fast
  const debounceDispatch = debounce(dispatch, 10);

  const handleDragScroll = useCallback(
    (scrollLeft: number) => {
      const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;

      debounceDispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

      // Also scroll regular top scroll element
      if (!topScrollRef.current) return;
      topScrollRef.current.scrollTo({ left: scrollLeft });

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

      // Also scroll drag scroll element
      // All other needed scrolls will be done via handleDragScroll indirectly
      if (!dragScrollRef.current) return;
      dragScrollRef.current.scrollTo({ left: scrollLeft });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maximumPosition, minimumPosition, virtualizedListRefsList]
  );

  useEffect(() => {
    if (!topScrollRef.current || !bottomScrollRef.current) return;

    let scrollPosition = scrollJumpPosition.scrollPosition;

    const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;

    if (scrollPosition > 1)
      scrollPosition = (scrollPosition - minimumPosition) / (maximumPosition - minimumPosition);

    const scrollLeft = widthOnScreen * scrollPosition - BOX_HEIGHT;

    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

    topScrollRef.current.scrollTo({ left: scrollLeft });
    bottomScrollRef.current.scrollTo({ left: scrollLeft });

    // Have to add a small delay or virtual lists won't scroll
    setTimeout(() => {
      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    }, 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollJumpPosition]);

  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstTenDetailedTranscriptsTotalHeight = transcripts
    .map((transcript) => getTranscriptVisualLineCount(transcript) * BOX_HEIGHT + 20)
    .slice(0, 10)
    .reduce((prev, next) => prev + next, 0);

  console.log(firstTenDetailedTranscriptsTotalHeight);
  return (
    <section className={classes.detailedTranscriptViewerContainer} id='detailedTranscriptViewerContainer'>
      {/* This is for regular scroll on the transcripts
       *  We have to do this because hideScrollbars={false} on ScrollContainer library is buggy
       */}
      <RegularScroll
        transcriptsData={transcriptsData}
        handleScroll={handleRegularScroll}
        ref={topScrollRef}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
        scrollStyles={{ top: 0 }}
        tooltipStyles={{ position: 'absolute', bottom: 0 }}
        tooltipPortalTo='transcriptsOverviewContainer'
      />

      {/* These are the actual transcripts */}
      <div
        className={classes.detailedTranscripts}
        style={{ height: firstTenDetailedTranscriptsTotalHeight, maxHeight: '100vh' }}
      >
        <DetailedTranscriptsVirtualList
          transcripts={transcripts}
          minimumPosition={minimumPosition}
          maximumPosition={maximumPosition}
          virtualizedListRefsList={virtualizedListRefsList}
        />
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
      {/* This is for regular scroll on the transcripts
       *  We have to do this because hideScrollbars={false} on ScrollContainer library is buggy
       */}
      <RegularScroll
        transcriptsData={transcriptsData}
        handleScroll={handleRegularScroll}
        ref={bottomScrollRef}
        hasTooltip={true}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
        scrollStyles={{ bottom: 0 }}
        tooltipStyles={{ position: 'fixed', bottom: '2.3rem' }}
      />
    </section>
  );
};

export default DetailedTranscripts;
