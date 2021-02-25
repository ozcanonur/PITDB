import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ScatterPlotCanvas } from '@nivo/scatterplot';
import AutoSizer from 'react-virtualized-auto-sizer';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { VolcanoPlotResponse } from './types';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles';

const VolcanoPlot = ({ ...props }) => {
  const classes = useStyles();

  // Project ID of the current route
  const { project } = useParams<{ project: string }>();
  // Filters for the table
  const filters = useSelector((state: RootState) => state.DGEFilters);

  const [volcanoPlotData, setVolcanoPlotData] = useState<VolcanoPlotResponse>({ data: [] });
  const [loading, setLoading] = useState(false);

  // Refetch and update on filters change
  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/dges/volcano-plot', {
      project,
      filters,
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
    <ProjectItemCard name='Gene expression' className={classes.projectItemCard} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <ScatterPlotCanvas
              width={width}
              height={height}
              data={data}
              margin={{ top: 40, right: 40, bottom: 100, left: 70 }}
              xScale={{ type: 'linear', min: fcMin, max: fcMax }}
              yScale={{ type: 'linear', min: 0, max: pMax }}
              useMesh={false}
              // Custom tooltip
              tooltip={({ node }) => {
                const { x, data, style } = node;
                return (
                  <div
                    className={classes.volcanoTooltipContainer}
                    style={{
                      right: x > 250 ? 0 : 'unset',
                      left: x < 250 ? 0 : 'unset',
                    }}
                  >
                    <div className={classes.volcanoTooltipSquare} style={{ backgroundColor: style.color }} />
                    {/* @ts-ignore */}
                    <div className={classes.volcanoTooltipName}>{`${data.symbol}:`}</div>
                    <div className={classes.volcanoTooltipValues}>{`fc: ${data.x}, p: ${data.y}`}</div>
                  </div>
                );
              }}
              blendMode='normal'
              colors={['rgba(65, 15, 94, 0.5)', 'rgba(44, 85, 122, 0.4)']}
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
          )}
        </AutoSizer>
      </div>
    </ProjectItemCard>
  );
};

export default VolcanoPlot;
