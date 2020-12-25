import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import { fetchFromApi } from 'utils';
import ExonSkipping from 'components/UI/Svg/ExonSkipping/ExonSkipping';
import { useStyles } from './styles';
import { EventResponse } from './types';

const EventVisual = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene, dPSI } = useSelector((state: RootState) => state.selectedSplicingEvent);

  const [eventData, setEventData] = useState<EventResponse>({
    eventType: '',
    chr: '',
    positions: [0, 0, 0, 0],
    direction: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchEventData = async (mounted: boolean) => {
    setLoading(true);

    const res: EventResponse = await fetchFromApi('/api/splicing-events/event', { project, gene, dPSI });

    if (!mounted || !res) return;

    setEventData(res);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    if (!gene || !dPSI) return;

    fetchEventData(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
