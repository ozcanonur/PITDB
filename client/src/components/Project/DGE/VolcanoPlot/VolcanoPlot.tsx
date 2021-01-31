import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveScatterPlotCanvas } from '@nivo/scatterplot';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { VolcanoPlotResponse } from './types';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles';

const VolcanoPlot = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const filters = useSelector((state: RootState) => state.DGEFilters);

  const [volcanoPlotData, setVolcanoPlotData] = useState<VolcanoPlotResponse>({ data: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/dges/volcano-plot', {
      project,
      filters: filters as any,
    }).then((res: VolcanoPlotResponse) => {
      if (!isMounted || !res) return;

      setVolcanoPlotData(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, project]);

  const { data, fcMax, fcMin, pMax } = volcanoPlotData;

  return (
    <ProjectItemCard name='Volcano plot' className={classes.projectItemCard} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveScatterPlotCanvas
          data={data}
          margin={{ top: 40, right: 40, bottom: 100, left: 70 }}
          xScale={{ type: 'linear', min: fcMin, max: fcMax }}
          yScale={{ type: 'linear', min: 0, max: pMax }}
          useMesh={false}
          tooltip={({ node }) => (
            <div className={classes.volcanoTooltipContainer}>
              <div className={classes.volcanoTooltipSquare} style={{ backgroundColor: node.style.color }} />
              {/* @ts-ignore */}
              <div className={classes.volcanoTooltipName}>{`${node.data.symbol}:`}</div>
              <div className={classes.volcanoTooltipValues}>{`fc: ${node.data.x}, p: ${node.data.y}`}</div>
            </div>
          )}
          blendMode='normal'
          axisTop={null}
          colors={['rgba(65, 15, 94, 0.5)', 'rgba(44, 85, 122, 0.4)']}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Fold change',
            legendPosition: 'middle',
            legendOffset: 36,
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '-Log10 p value',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          theme={{
            fontFamily: 'Poppins, sans-serif',
            textColor: 'rgb(51,51,102)',
          }}
        />
      </div>
    </ProjectItemCard>
  );
};

export default VolcanoPlot;
