import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { ReadCountsData } from './types';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles/figures';

const BarChart = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { symbol } = useSelector((state: RootState) => state.selectedDGE);

  const [readCountsData, setReadCountsData] = useState<ReadCountsData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!symbol) return;

    setLoading(true);

    fetchFromApi('/api/dges/readCount', { project, symbol }).then((res) => {
      if (!mounted || !res) return;

      setReadCountsData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [symbol, project]);

  const parsedReadCountsForBarChart = Object.keys(readCountsData).map((condition) => ({
    condition,
    ...readCountsData[condition],
  }));

  return (
    <ProjectItemCard name={`Read counts for ${symbol}`} className={classes.projectItemCard}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={parsedReadCountsForBarChart}
          keys={['1', '2', '3']}
          indexBy='condition'
          margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
          padding={0.1}
          labelFormat='.1f'
          layout='horizontal'
          colors={['rgba(107, 107, 179, 0.65)', 'rgba(44, 85, 122, 0.7)', 'rgba(65, 15, 94, 0.8)']}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Read count',
            legendPosition: 'middle',
            legendOffset: 40,
            tickValues: 5,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Condition',
            legendPosition: 'middle',
            legendOffset: -45,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={'white'}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
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

export default BarChart;
