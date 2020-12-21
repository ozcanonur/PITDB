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
  const filters = useSelector((state: RootState) => state.mutationFilters);

  const [data, setData] = useState<TypesData>({ SNP: 0, DEL: 0, INS: 0 });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!filters) return;

    setLoading(true);

    fetchFromApi('/api/mutations/types', { projectId, filters: filters as any }).then((res) => {
      if (!mounted || !res) return;

      setData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [projectId, filters]);

  const typeDistributionData = Object.keys(data).map((type) => ({
    id: type,
    label: type,
    // @ts-ignore
    value: data[type],
  }));

  return (
    <ProjectItemCard name='Variant type distribution' className={classes.projectItemCard}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsivePie
          data={typeDistributionData}
          margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
          innerRadius={0.4}
          padAngle={3}
          cornerRadius={0}
          colors={['rgba(107, 107, 179, 0.65)', 'rgba(65, 15, 94, 0.8)', '#2C557A']}
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
          }}
        />
      </div>
    </ProjectItemCard>
  );
};

export default PieChart;
