import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import { fetchFromApi } from 'utils';
import ExonSkipping from 'components/UI/Svg/ExonSkipping/ExonSkipping';
import { useStyles } from './styles/eventVisual';
import { EventData } from './types';

const EventVisual = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene, dPSI } = useSelector((state: RootState) => state.selectedSplicingEvent);

  const [eventData, setEventData] = useState<EventData>({
    eventType: '',
    chr: '',
    positions: [0, 0, 0, 0],
    direction: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!gene || !dPSI) return;

    setLoading(true);

    fetchFromApi('/api/splicingEvents/event', { project, gene, dPSI }).then((res) => {
      if (!mounted || !res) return;

      setEventData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [project, gene, dPSI]);

  return (
    <ProjectItemCard name={`Splicing Event for ${gene}`} className={classes.projectItemCard}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ExonSkipping eventData={eventData} className={classes.svg} />
      </div>
    </ProjectItemCard>
  );
};

export default EventVisual;
