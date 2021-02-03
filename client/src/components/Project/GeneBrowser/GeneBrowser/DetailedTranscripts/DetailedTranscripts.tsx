import { useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragScroll from 'react-indiana-drag-scroll';

import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import RegularScroll from './RegularScroll/RegularScroll';

import { useStyles } from './styles';
import { TranscriptsResponse, DetailedTranscriptsVirtualListsProps } from '../../types';
import { setGeneBrowserScrollPosition } from 'actions';

import { makeVirtualizedListRefsList, scrollVirtualRefs } from './helpers';
import { debounce } from 'lodash';

const BOX_HEIGHT = 30;

// Need to make this a separate pure component to avoid re-renders on scrollJumpPosition change
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
  const debounceDispatch = debounce(dispatch, 15);

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
    }, 5);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollJumpPosition]);

  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={classes.detailedTranscripts}>
        <DetailedTranscriptsVirtualLists
          transcripts={transcripts}
          minimumPosition={minimumPosition}
          maximumPosition={maximumPosition}
          refs={virtualizedListRefsList}
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
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
        scrollStyles={{ bottom: 0 }}
        tooltipStyles={{ position: 'fixed', bottom: '2.3rem' }}
      />
    </section>
  );
};

export default DetailedTranscripts;
