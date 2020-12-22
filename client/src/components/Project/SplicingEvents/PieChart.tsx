import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { TypesData } from './types';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles/figures';

const PieChart = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const filters = useSelector((state: RootState) => state.splicingEventsFilters);

  const [data, setData] = useState<TypesData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!filters) return;

    setLoading(true);

    fetchFromApi('/api/splicingEvents/types', { projectId, filters: filters as any }).then((res) => {
      if (!mounted || !res) return;

      setData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [projectId, filters]);

  const typeDistributionData: { id: string; label: string; value: number }[] = [];
  for (const type of Object.keys(data)) {
    // @ts-ignore
    const value = data[type];
    if (value === 0) continue;

    typeDistributionData.push({
      id: type,
      label: type,
      value,
    });
  }

  return (
    <ProjectItemCard name='Event type distribution for selected filters' className={classes.projectItemCard}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsivePie
          data={typeDistributionData}
          margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
          innerRadius={0.4}
          padAngle={3}
          cornerRadius={0}
          colors={['rgba(107, 107, 179, 0.65)', 'rgba(65, 15, 94, 0.8)', 'rgba(44, 85, 122, 0.7)']}
          borderWidth={0}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          radialLabelsSkipAngle={0}
          radialLabelsTextColor='#333333'
          radialLabelsLinkColor={{ from: 'color' }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor='white'
          theme={{
            fontFamily: 'Poppins, sans-serif',
            textColor: 'rgb(51,51,102)',
            tooltip: {
              // @ts-ignore
              fontSize: '1.4rem',
              color: 'rgb(51,51,102)',
              textColor: 'rgb(51,51,102)',
            },
          }}
        />
      </div>
    </ProjectItemCard>
  );
};

export default PieChart;
