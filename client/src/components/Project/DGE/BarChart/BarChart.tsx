import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';
import { mean } from 'lodash';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { getValuesForCondition, getMaxReadCount } from './helpers';
import { ReadCountResponse, BarChartData, PointsLayerProps } from './types';
import { getCi } from 'components/Project/TranscriptUsage/ConfidenceChart/ConfidenceChartSvg/helpers';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { symbol } = useSelector((state: RootState) => state.selectedDGE);

  const [barChartData, setBarChartData] = useState<BarChartData>([]);
  const [loading, setLoading] = useState(false);

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

  const meanReadCounts = barChartData.map((condition) => ({
    mean: mean(getValuesForCondition(condition)),
    condition: condition.condition,
  }));

  const Points = ({ bars, xScale, yScale }: PointsLayerProps) => {
    return (
      <>
        {bars.map((bar, index) => {
          const condition = bar.data.indexValue;
          const currentCondition = barChartData.filter((data) => data.condition === condition)[0];

          const values = getValuesForCondition(currentCondition).sort();

          const ci = getCi(values);

          return (
            <Fragment key={index}>
              {/* This is the vertical line at the start of variance line */}
              <line
                x1={xScale(mean(values) - ci)}
                y1={yScale(bar.data.data.condition) + bar.height / 2 - bar.height / 6}
                x2={xScale(mean(values) - ci)}
                y2={yScale(bar.data.data.condition) + bar.height / 2 + bar.height / 6}
                stroke='rgba(65, 15, 94, 0.8)'
                strokeWidth='1.5'
              />
              {/* This is the horizontal variance line */}
              <line
                x1={xScale(mean(values) - ci)}
                y1={yScale(bar.data.data.condition) + bar.height / 2}
                x2={xScale(mean(values) + ci)}
                y2={yScale(bar.data.data.condition) + bar.height / 2}
                stroke='rgba(65, 15, 94, 0.8)'
                strokeWidth='1.5'
              />
              {/* This is the vertical line at the end of variance line */}
              <line
                x1={xScale(mean(values) + ci)}
                y1={yScale(bar.data.data.condition) + bar.height / 2 - bar.height / 6}
                x2={xScale(mean(values) + ci)}
                y2={yScale(bar.data.data.condition) + bar.height / 2 + bar.height / 6}
                stroke='rgba(65, 15, 94, 0.8)'
                strokeWidth='1.5'
              />
              {/* These are the points */}
              {values.map((value, valueIndex) => (
                <circle
                  key={valueIndex}
                  cx={xScale(value)}
                  cy={yScale(bar.data.data.condition) + bar.height / 2 + valueIndex * 5}
                  r={5}
                  fill='rgba(65, 15, 94, 0.8)'
                />
              ))}
            </Fragment>
          );
        })}
      </>
    );
  };

  return (
    <ProjectItemCard name={`Read counts for ${symbol}`} className={classes.projectItemCard} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.barChartContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          layers={['grid', 'axes', 'bars', 'markers', Points]}
          enableGridX
          enableGridY
          data={meanReadCounts}
          keys={['mean']}
          maxValue={getMaxReadCount(barChartData)}
          indexBy='condition'
          margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
          padding={0.1}
          labelFormat='.1f'
          layout='horizontal'
          colors={['rgba(44, 85, 122, 0.65)']}
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
