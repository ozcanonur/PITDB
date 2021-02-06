import React, { useEffect, useRef, useMemo, ChangeEvent, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragScroll from 'react-indiana-drag-scroll';
import debounce from 'lodash/debounce';

import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import RegularScroll from './RegularScroll/RegularScroll';

import { DetailedTranscriptsVirtualListProps } from '../../types';
import { setGeneBrowserBoxHeight, setGeneBrowserScrollPosition } from 'actions';
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

const DetailedTranscripts = () => {
  const classes = useStyles();

  const transcriptsData = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
  const transcriptVisibility = useSelector((state: RootState) => state.geneBrowserTranscriptVisibility);
  const boxHeight = useSelector((state: RootState) => state.geneBrowserBoxHeight);
  const scrollJumpPosition = useSelector((state: RootState) => state.geneBrowserScrollJumpPositionPercent);
  const transcriptScrollPosition = useSelector((state: RootState) => state.geneBrowserScrollPosition);

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  /* We are going to pass down refs to the detailed transcript children virtualized lists
   * So that we can control their scroll status from this component
   * Storing the scroll state on redux would rerender detailed transcripts
   * Which is very performance heavy
   * First, generate the refs
   */
  const virtualizedListRefsList = useMemo(() => makeVirtualizedListRefsList(transcripts), [transcripts]);

  const dragScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Debounce to not change redux state too quick
  const debounceDispatch = debounce(dispatch, 10);

  const handleDragScroll = (scrollLeft: number) => {
    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

    // And scroll regular bottom scroll element
    if (!bottomScrollRef.current) return;
    bottomScrollRef.current.scrollTo({ left: scrollLeft });

    const transcriptWidthOnScreen = (maximumPosition - minimumPosition) * boxHeight;
    const percentageScrolled = scrollLeft / transcriptWidthOnScreen;

    const transcriptGenomeWidth = maximumPosition - minimumPosition + 1;

    const currentTranscriptPosition = Math.floor(
      minimumPosition + transcriptGenomeWidth * percentageScrolled
    );

    // Change the position line indicator
    debounceDispatch(setGeneBrowserScrollPosition(currentTranscriptPosition));
  };

  const handleRegularScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollLeft = e.currentTarget.scrollLeft;

    // Scroll drag scroll element
    // All other scrolls will be done via handleDragScroll indirectly
    if (!dragScrollRef.current) return;
    dragScrollRef.current.scrollTo({ left: scrollLeft });
  };

  // Reset the position on unmount
  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(minimumPosition));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to the current transcript position on box height change
  // Have to do this because the width etc. changes
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    const positionOffset = transcriptScrollPosition - minimumPosition;
    const percentageScrolled = positionOffset / (maximumPosition - minimumPosition + 1);

    const widthOnScreen = (maximumPosition - minimumPosition + 1) * boxHeight;
    const scrollLeft = percentageScrolled * widthOnScreen;

    bottomScrollRef.current.scrollTo({ left: scrollLeft });
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxHeight]);

  // WOOP
  // Jump to a position whenever the user clicks on a position on top transcripts overview
  useEffect(() => {
    if (!bottomScrollRef.current) return;

    const transcriptScrollPosition = scrollJumpPosition.scrollPosition;
    dispatch(setGeneBrowserScrollPosition(transcriptScrollPosition));

    const transcriptPercentagePosition =
      (transcriptScrollPosition - minimumPosition) / (maximumPosition - minimumPosition);

    const widthOnScreen = (maximumPosition - minimumPosition) * boxHeight;

    const scrollLeft = widthOnScreen * transcriptPercentagePosition - boxHeight;

    bottomScrollRef.current.scrollTo({ left: scrollLeft });

    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollJumpPosition]);

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
       *  We have to do this because hideScrollbars={false} on ScrollContainer library is buggy
       */}
      <RegularScroll
        handleScroll={handleRegularScroll}
        ref={bottomScrollRef}
        width={(maximumPosition - minimumPosition + 1) * boxHeight}
        scrollStyles={{ bottom: 0 }}
        hasTooltip={true}
        tooltipStyles={{ position: 'fixed', bottom: '2.3rem' }}
      />
    </section>
  );
};

export default DetailedTranscripts;
