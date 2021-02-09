import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Line } from '@nivo/line';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import NoResults from 'components/UI/NoResults/NoResults';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { PeptideIntensityResponse, LineChartData } from './types';
import { parseLineChartData } from './helpers';
import GenericLegend from 'components/UI/GenericLegend/GenericLegend';
import { contrastingColors } from 'variables/contrastingColors';

const LineChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { symbol } = useSelector((state: RootState) => state.selectedDGE);

  const [peptideIntensities, setPeptideIntensities] = useState<PeptideIntensityResponse>({
    symbol: '',
    peptides: null,
    project: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!symbol) return;

    setLoading(true);

    fetchFromApi('/api/dges/peptide-intensity', { project, symbol }).then((res: PeptideIntensityResponse) => {
      if (!isMounted) return;

      if (!res) {
        setLoading(false);
        setPeptideIntensities({ symbol, peptides: null, project });
        return;
      }

      setPeptideIntensities(res);

      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, project]);

  const parsedLineChartData: LineChartData | null = parseLineChartData(peptideIntensities);

  return (
    <ProjectItemCard
      name={`Differential peptide intensity for ${symbol}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <NoResults
        heading={`No peptide intensity data found for ${symbol}`}
        subHeading='Try another symbol'
        className={classes.noResults}
        style={{ opacity: !loading && !parsedLineChartData ? 1 : 0 }}
      />
      <div
        className={classes.lineChartContainer}
        style={{ opacity: !loading && parsedLineChartData ? 1 : 0 }}
      >
        <AutoSizer>
          {({ width, height }) =>
            parsedLineChartData ? (
              <Line
                width={width}
                height={height}
                data={parsedLineChartData}
                colors={({ color }) => color}
                yFormat={(e) => e.toLocaleString()}
                tooltipFormat={(e) => e.toLocaleString()}
                tooltip={({ point }) => {
                  const width = Math.max(point.id.length, 18) * 10;

                  return (
                    <svg
                      className={classes.tooltipSvg}
                      xmlns='http://www.w3.org/2000/svg'
                      width={width}
                      height={68}
                    >
                      <circle cx={8} cy={10} r={8} fill={point.borderColor} />
                      <text x={30} y={14} className={classes.tooltipText} fontWeight={500}>
                        {point.serieId}
                      </text>
                      <text x={30} y={31} className={classes.tooltipText}>
                        {`Intensity: ${point.data.y.toLocaleString()}`}
                      </text>
                      <text x={30} y={48} className={classes.tooltipText}>
                        {`Condition: ${point.data.x}`}
                      </text>
                    </svg>
                  );
                }}
                // enableSlices='x'
                useMesh
                enableGridY={false}
                margin={{ top: 35, right: 35, bottom: 40, left: 110 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickValues: 5,
                  tickRotation: 0,
                  legend: 'Peptide intensity',
                  legendOffset: -90,
                  legendPosition: 'middle',
                  format: (e) => e.toLocaleString(),
                }}
                pointSize={1}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={10}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                theme={{
                  fontFamily: 'Poppins, sans-serif',
                  textColor: '#336',
                  tooltip: {
                    // @ts-ignore
                    fontSize: '1.4rem',
                    color: '#336',
                    textColor: '#336',
                  },
                }}
              />
            ) : null
          }
        </AutoSizer>
      </div>
      <GenericLegend
        direction='horizontal'
        items={peptideIntensities.peptides ? Object.keys(peptideIntensities.peptides) : []}
        colors={contrastingColors}
        className={classes.legend}
      />
    </ProjectItemCard>
  );
};

export default LineChart;
