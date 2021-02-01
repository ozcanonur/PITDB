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

const RegularScroll = forwardRef(
  ({ handleScroll, width, children, position }: RegularScrollProps, ref: any) => {
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

    const cssPosition = position === 'top' ? { top: 0 } : { bottom: 0 };

    return (
      <div className={classes.scrollContainer} onScroll={onScroll} ref={ref} style={cssPosition}>
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
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const handleDragScroll = (scrollLeft: number) => {
    const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;
    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

    // Also scroll regular top scroll element
    // Second if check is to avoid cycles
    if (!topScrollRef.current || topScrollRef.current.scrollLeft === scrollLeft) return;
    topScrollRef.current.scrollTo({ left: scrollLeft });

    if (!bottomScrollRef.current || bottomScrollRef.current.scrollLeft === scrollLeft) return;
    bottomScrollRef.current.scrollTo({ left: scrollLeft });
  };

  const handleRegularScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollLeft = e.currentTarget.scrollLeft;

    const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;
    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);

    // Also scroll drag scroll element
    // Second if check is to avoid cycles
    if (!dragScrollRef.current || dragScrollRef.current.scrollLeft === scrollLeft) return;
    dragScrollRef.current.scrollTo({ left: scrollLeft });

    if (!bottomScrollRef.current || bottomScrollRef.current.scrollLeft === scrollLeft) return;
    bottomScrollRef.current.scrollTo({ left: scrollLeft });
  };

  useEffect(() => {
    if (!topScrollRef.current || !dragScrollRef.current) return;

    // Only scrolling this is enough to trigger other scrolls
    topScrollRef.current.scrollTo({ left: scrollJumpPosition.scrollPosition * BOX_HEIGHT - BOX_HEIGHT });
  }, [scrollJumpPosition]);

  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={classes.detailedTranscriptViewerContainer}>
      <RegularScroll
        handleScroll={handleRegularScroll}
        ref={topScrollRef}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
        position='top'
      >
        <ScrollTooltip transcriptsData={transcriptsData} position='top' />
      </RegularScroll>
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
        ref={bottomScrollRef}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
        position='bottom'
      >
        <ScrollTooltip transcriptsData={transcriptsData} position='bottom' />
      </RegularScroll>
    </section>
  );
};

export default DetailedTranscripts;
