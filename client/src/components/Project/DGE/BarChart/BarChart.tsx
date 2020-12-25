import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { ReadCountResponse, BarChartData } from './types';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { symbol } = useSelector((state: RootState) => state.selectedDGE);

  const [barChartData, setBarChartData] = useState<BarChartData>([]);
  const [loading, setLoading] = useState(false);

  const fetchReadCounts = async (mounted: boolean) => {
    const res: ReadCountResponse = await fetchFromApi('/api/dges/read-count', { project, symbol });

    setLoading(false);

    if (!mounted || !Object.keys(res)) return;

    // Bar charts accepts data in this format
    const parsedReadCount: BarChartData = Object.keys(res).map((condition) => ({
      condition,
      ...res[condition],
    }));

    setBarChartData(parsedReadCount);
  };

  useEffect(() => {
    let mounted = true;

    if (!symbol) return;

    setLoading(true);

    fetchReadCounts(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, project]);

  let barChartKeys: string[] = [];
  if (barChartData.length > 0) barChartKeys = Object.keys(barChartData[0]).filter((e) => e !== 'condition');

  return (
    <ProjectItemCard name={`Read counts for ${symbol}`} className={classes.projectItemCard} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.barChartContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={barChartData}
          keys={barChartKeys}
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
