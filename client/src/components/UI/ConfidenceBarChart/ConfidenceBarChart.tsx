import { Fragment } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { mean } from 'lodash';

import { getMaxReadCount, getValuesForCondition } from './helpers';
import { getCi } from 'components/Project/TranscriptUsage/ConfidenceChart/ConfidenceChartSvg/helpers';
import { LayerProps, ConfidenceBarChartProps } from './types';

const ConfidenceBarChart = ({
  barChartData,
  axisBottomLabel,
  axisLeftLabel,
  labelFormat,
  min,
  max,
  barColor,
}: ConfidenceBarChartProps) => {
  const meanReadCounts = barChartData.map((condition) => ({
    mean: mean(getValuesForCondition(condition)),
    condition: condition.condition,
  }));

  const Interval = ({ bars, xScale, yScale }: LayerProps) => (
    <>
      {bars.map((bar, index) => {
        const condition = bar.data.indexValue;
        const currentCondition = barChartData.find((data) => data.condition === condition);

        if (!currentCondition) return null;

        const values = getValuesForCondition(currentCondition).sort();
        const ci = getCi(values);

        return (
          <Fragment key={index}>
            {/* This is the vertical line at the start of variance line */}
            <line
              x1={Math.max(xScale(mean(values) - ci), 0)}
              y1={yScale(bar.data.data.condition) + bar.height / 2 - bar.height / 6}
              x2={Math.max(xScale(mean(values) - ci), 0)}
              y2={yScale(bar.data.data.condition) + bar.height / 2 + bar.height / 6}
              stroke='rgba(65, 15, 94, 0.8)'
              strokeWidth='2.5'
              style={{ transition: 'all .4s' }}
            />
            {/* This is the horizontal variance line */}
            <line
              x1={Math.max(xScale(mean(values) - ci), 0)}
              y1={yScale(bar.data.data.condition) + bar.height / 2}
              x2={xScale(mean(values) + ci)}
              y2={yScale(bar.data.data.condition) + bar.height / 2}
              stroke='rgba(65, 15, 94, 0.8)'
              strokeWidth='2.5'
              style={{ transition: 'all .4s' }}
            />
            {/* This is the vertical line at the end of variance line */}
            <line
              x1={xScale(mean(values) + ci)}
              y1={yScale(bar.data.data.condition) + bar.height / 2 - bar.height / 6}
              x2={xScale(mean(values) + ci)}
              y2={yScale(bar.data.data.condition) + bar.height / 2 + bar.height / 6}
              stroke='rgba(65, 15, 94, 0.8)'
              strokeWidth='2.5'
              style={{ transition: 'all .4s' }}
            />
          </Fragment>
        );
      })}
    </>
  );

  const Points = ({ bars, xScale, yScale }: LayerProps) => (
    <>
      {bars.map((bar, index) => {
        const condition = bar.data.indexValue;
        const currentCondition = barChartData.find((data) => data.condition === condition);

        if (!currentCondition) return null;

        const values = getValuesForCondition(currentCondition).sort();

        return (
          <Fragment key={index}>
            {/* These are the points */}
            {values.map((value, valueIndex) => (
              <circle
                key={valueIndex}
                cx={xScale(value)}
                cy={yScale(bar.data.data.condition) + bar.height / 2 + valueIndex * 8}
                r={5}
                fill='rgba(65, 15, 94, 0.8)'
                style={{ transition: 'all .4s' }}
              />
            ))}
          </Fragment>
        );
      })}
    </>
  );

  return (
    <ResponsiveBar
      layers={['grid', Interval, 'bars', 'axes', 'markers', Points]}
      enableGridX
      enableGridY
      data={meanReadCounts}
      keys={['mean']}
      minValue={min || undefined}
      maxValue={max || getMaxReadCount(barChartData)}
      indexBy='condition'
      margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
      padding={0.1}
      labelFormat={labelFormat}
      layout='horizontal'
      colors={barColor || ['rgba(44, 85, 122, 0.65)']}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisBottomLabel,
        legendPosition: 'middle',
        legendOffset: 40,
        tickValues: 10,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisLeftLabel,
        legendPosition: 'middle',
        legendOffset: -45,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={'white'}
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
  );
};

export default ConfidenceBarChart;
