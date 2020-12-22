import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import { fetchFromApi } from 'utils';
import ExonSkipping from 'assets/exon_skipping.svg';
import ArrowLeft from 'assets/arrow_left.svg';
import ArrowRight from 'assets/arrow_right.svg';
import { useStyles } from './styles/eventVisual';
import { EventData } from './types';

const EventVisual = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const { gene, dPSI } = useSelector((state: RootState) => state.selectedSplicingEvent);

  const [eventData, setEventData] = useState<EventData>({
    eventType: '',
    chr: '',
    leftPositions: [0, 0],
    rightPositions: [0, 0],
    direction: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!gene || !dPSI) return;

    setLoading(true);

    fetchFromApi('/api/splicingEvents/event', { projectId, gene, dPSI }).then((res) => {
      if (!mounted || !res) return;

      setEventData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [projectId, gene, dPSI]);

  const { chr, direction, eventType, leftPositions, rightPositions } = eventData;

  return (
    <ProjectItemCard name='Event Visual' className={classes.projectItemCard}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <div className={classes.chr}>{`${chr}, ${eventType}`}</div>
        <img className={classes.imgArrow} src={direction === '-' ? ArrowRight : ArrowLeft} alt='arrow' />
        <img className={classes.img} src={ExonSkipping} alt='exon skipping' />
        <div className={classes.positions}>
          <div className={classes.topPositions}>
            <div className={classes.position}>{leftPositions[1]}</div>
            <div className={classes.position}>{rightPositions[1]}</div>
          </div>
          <div className={classes.bottomPositions}>
            <div className={classes.position}>{leftPositions[0]}</div>
            <div className={classes.position}>{rightPositions[0]}</div>
          </div>
        </div>
      </div>
    </ProjectItemCard>
  );
};

export default EventVisual;
