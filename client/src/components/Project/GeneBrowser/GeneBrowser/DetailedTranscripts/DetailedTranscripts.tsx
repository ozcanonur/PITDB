import { useEffect, useRef, forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';

import DetailedTranscript from '../DetailedTranscript/DetailedTranscript';
import ScrollTooltip from './ScrollTooltip';

import { useStyles } from './styles';
import { TranscriptsResponse, RegularScrollProps } from '../../types';
import { setGeneBrowserScrollPosition } from 'actions';

import { makeVirtualizedListRefsList, scrollVirtualRefs } from './helpers';

const BOX_HEIGHT = 30;

// const TranscriptNames = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
//   const classes = useStyles();

//   return (
//     <>
//       {transcriptsData.transcripts.map(({ transcriptId, conditions, cds }, index) => {
//         if (index > 0) return null;

//         const cdsLineCount = cds?.length || 0;
//         const peptideLineCount =
//           (cds && cds?.map(({ peptides }) => peptides).filter((e) => e !== undefined).length) || 0;

//         const transcriptInfoHeight = 3 + cdsLineCount * 3 + peptideLineCount * 3;

//         // WOOP, hardcoded condition colors
//         // WOOP, hardcoded condition number on width 8.5rem => 4rem each with 0.5 margin between
//         return (
//           <div
//             key={transcriptId}
//             className={classes.transcriptInfo}
//             style={{ height: `${transcriptInfoHeight}rem` }}
//           >
//             <div className={classes.transcriptId}>
//               <div className={classes.transcriptIdConditions} style={{ width: '8.5rem' }}>
//                 {conditions.map(({ condition }) => (
//                   <div
//                     key={condition}
//                     className={classes.transcriptIdCondition}
//                     style={{ backgroundColor: condition === 'Nsi' ? '#336' : '#6b88a2' }}
//                   >
//                     {condition}
//                   </div>
//                 ))}
//               </div>
//               <p className={classes.transcriptIdText}>{transcriptId}</p>
//             </div>
//             <div className={classes.cdssContainer}>
//               {cds?.map(({ strand }, index) => {
//                 const isReverse = strand === '-';

//                 return (
//                   <p key={index} className={classes.transcriptIdText}>{`CDS, ${
//                     isReverse ? 'reverse' : 'forward'
//                   } strand`}</p>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// };

const RegularScroll = forwardRef(({ handleScroll, width, children }: RegularScrollProps, ref: any) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const classes = useStyles();

  let timeout = useRef<NodeJS.Timeout>();

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    handleScroll(e);

    // @ts-ignore
    clearTimeout(timeout.current);

    setTooltipOpen(true);

    timeout.current = setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

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

const DetailedTranscripts = ({ transcriptsData }: { transcriptsData: TranscriptsResponse }) => {
  const classes = useStyles();

  const { minimumPosition, maximumPosition, transcripts } = transcriptsData;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setGeneBrowserScrollPosition(0));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* We are going to pass down refs to the detailed transcript children virtualized lists
   * So that we can control their scroll status from this component
   * First, generate the refs
   */
  const virtualizedListRefsList = makeVirtualizedListRefsList(transcripts);

  const dragScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDragScroll = (scrollLeft: number) => {
    const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;
    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

    // Also scroll regular scroll element
    // Second if check is to avoid cycles
    if (!scrollRef.current || scrollRef.current.scrollLeft === scrollLeft) return;
    scrollRef.current.scrollTo({ left: scrollLeft });

    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollLeft = e.currentTarget.scrollLeft;

    const widthOnScreen = (maximumPosition - minimumPosition) * BOX_HEIGHT;
    dispatch(setGeneBrowserScrollPosition((scrollLeft / widthOnScreen) * 100));

    // Also scroll drag scroll element
    // Second if check is to avoid cycles
    if (!dragScrollRef.current || dragScrollRef.current.scrollLeft === scrollLeft) return;
    dragScrollRef.current.scrollTo({ left: scrollLeft });

    // Scroll all the children transcript virtualized lists
    scrollVirtualRefs(scrollLeft, virtualizedListRefsList);
  };

  return (
    <div className={classes.detailedTranscriptViewerContainer}>
      <div className={classes.detailedTranscripts}>
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
              refs={virtualizedListRefsList[index]}
            />
          );
        })}
      </div>
      {/* This is for drag scroll on the transcripts */}
      <ScrollContainer
        className={`${classes.scrollDragContainer} scroll-container`}
        onScroll={handleDragScroll}
        horizontal={true}
        vertical={false}
        activationDistance={0}
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
       *  We have to do this because hideScrollbars={true} on ScrollContainer library is buggy
       */}
      <RegularScroll
        handleScroll={handleScroll}
        ref={scrollRef}
        width={(maximumPosition - minimumPosition + 1) * BOX_HEIGHT}
      >
        <ScrollTooltip transcriptsData={transcriptsData} />
      </RegularScroll>
    </div>
  );
};

export default DetailedTranscripts;
