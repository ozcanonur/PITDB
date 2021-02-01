import { useEffect, useRef, forwardRef, useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';

import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import ScrollTooltip from './ScrollTooltip';

import { useStyles } from './styles';
import { TranscriptsResponse, RegularScrollProps, DetailedTranscriptsVirtualListsProps } from '../../types';
import { setGeneBrowserScrollPosition } from 'actions';

import { makeVirtualizedListRefsList, scrollVirtualRefs } from './helpers';

const BOX_HEIGHT = 30;

const RegularScroll = forwardRef(({ handleScroll, width, children }: RegularScrollProps, ref: any) => {
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
      <div style={{ display: tooltipOpen ? 'inherit' : 'none' }}>{children}</div>
    </div>
  );
});

// Have to make this a seperate pure component to avoid re-renders on scrollJumpPosition change
const DetailedTranscriptsVirtualLists = memo(
  ({ transcripts, minimumPosition, maximumPosition, refs }: DetailedTranscriptsVirtualListsProps) => (
    <>
      {transcripts.map((transcript, index) => {
        // if (index > 1) return null;

        return (
          <DetailedTranscript
            key={transcript.transcriptId}
            transcriptData={{
              transcript,
              minimumPosition,
              maximumPosition,
            }}
            refs={refs[index]}
          />
        );
      })}
    </>
  )
);

const DetailedTranscripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  // When the user clicks an exon on the transcripts overview
  const scrollJumpPosition = useSelector((state: RootState) => state.geneBrowserScrollJumpPosition);

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  const dispatch = useDispatch();

  /* We are going to pass down refs to the detailed transcript children virtualized lists
   * So that we can control their scroll status from this component
   * First, generate the refs
   */
  const virtualizedListRefsList = makeVirtualizedListRefsList(transcripts);

  const dragScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDragScroll = useCallback(
    (scrollLeft: number) => {
      const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;
      dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

      // Also scroll regular scroll element
      // Second if check is to avoid cycles
      if (!scrollRef.current || scrollRef.current.scrollLeft === scrollLeft) return;
      scrollRef.current.scrollTo({ left: scrollLeft });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maximumPosition, minimumPosition, virtualizedListRefsList]
  );

  const handleRegularScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const scrollLeft = e.currentTarget.scrollLeft;

      const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;
      dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

      // Scroll all the children transcript virtualized lists
      scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

      // Also scroll drag scroll element
      // Second if check is to avoid cycles
      if (!dragScrollRef.current || dragScrollRef.current.scrollLeft === scrollLeft) return;
      dragScrollRef.current.scrollTo({ left: scrollLeft });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maximumPosition, minimumPosition, virtualizedListRefsList]
  );

  useEffect(() => {
    if (!scrollRef.current || !dragScrollRef.current) return;

    // Only scrolling this is enough to trigger other scrolls
    scrollRef.current.scrollTo({ left: scrollJumpPosition.scrollPosition * BOX_HEIGHT - BOX_HEIGHT });
  }, [scrollJumpPosition]);

  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={classes.detailedTranscriptViewerContainer}>
      <div className={classes.detailedTranscripts}>
        <DetailedTranscriptsVirtualLists
          transcripts={transcripts}
          minimumPosition={minimumPosition}
          maximumPosition={maximumPosition}
          refs={virtualizedListRefsList}
        />
      </div>
      {/* This is for drag scroll on the transcripts, scroll-container class is library req. */}
      <ScrollContainer
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
      </ScrollContainer>
      {/* This is for regular scroll on the transcripts
       *  We have to do this because hideScrollbars={false} on ScrollContainer library is buggy
       */}
      <RegularScroll
        handleScroll={handleRegularScroll}
        ref={scrollRef}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
      >
        <ScrollTooltip transcriptsData={transcriptsData} />
      </RegularScroll>
    </section>
  );
};

export default DetailedTranscripts;
