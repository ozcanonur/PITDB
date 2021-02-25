import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { ReadCountResponse, BarChartData } from './types';
import ConfidenceBarChart from 'components/UI/ConfidenceBarChart/ConfidenceBarChart';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  // Project ID of the current route
  const { project } = useParams<{ project: string }>();
  // Currently selected symbol on the table
  const { symbol } = useSelector((state: RootState) => state.selectedDGE);

  const [barChartData, setBarChartData] = useState<BarChartData>([]);
  const [loading, setLoading] = useState(false);

  // Refetch on selected symbol change
  useEffect(() => {
    let isMounted = true;

    if (!symbol) return;

    setLoading(true);

    fetchFromApi('/api/dges/read-count', { project, symbol }).then((res: ReadCountResponse) => {
      if (!isMounted || !res) return;

      const parsedReadCount: BarChartData = Object.keys(res).map((condition) => ({
        condition,
        ...res[condition],
      }));

      setBarChartData(parsedReadCount);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, project]);

  return (
    <ProjectItemCard
      name={`Normalised read counts for ${symbol}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.barChartContainer} style={{ opacity: loading ? 0 : 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <ConfidenceBarChart
              barChartData={barChartData}
              axisBottomLabel='Normalised read count'
              axisLeftLabel='Condition'
              labelFormat='.2f'
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    </ProjectItemCard>
  );
};

export default BarChart;
