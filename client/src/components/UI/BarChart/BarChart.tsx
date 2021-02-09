import { Bar } from '@nivo/bar';

import { BarChartProps } from './types';

const BarChart = ({
  data,
  keys,
  indexBy,
  colors,
  bottomAxisText,
  leftAxisText,
  width,
  height,
}: BarChartProps) => {
  return (
    <Bar
      width={width}
      height={height}
      enableGridX={false}
      enableGridY
      data={data}
      keys={keys}
      indexBy={indexBy}
      margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
      padding={0.1}
      layout='horizontal'
      colors={colors}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: bottomAxisText,
        legendPosition: 'middle',
        legendOffset: 40,
        tickValues: 5,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: leftAxisText,
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
  );
};

export default BarChart;
