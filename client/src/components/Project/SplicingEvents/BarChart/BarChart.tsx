import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { ConditionsResponse } from './types';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene, dPSI } = useSelector((state: RootState) => state.selectedSplicingEvent);

  const [conditionsData, setConditionsData] = useState<ConditionsResponse>({});
  const [loading, setLoading] = useState(false);

  const fetchConditionsData = async (mounted: boolean) => {
    setLoading(true);
    const res: ConditionsResponse = await fetchFromApi('/api/splicing-events/conditions', { project, gene, dPSI });

    if (!mounted || !res) return;

    setConditionsData(res);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    if (!gene || !dPSI) return;

    fetchConditionsData(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gene, dPSI, project]);

  // Bar chart wants data in this format
  const parsedConditionsDataForBarChart = Object.keys(conditionsData).map((condition) => ({
    condition,
    value: conditionsData[condition],
  }));

  return (
    <ProjectItemCard
      name={`Conditions for ${gene} with ${dPSI.toLocaleString()}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={parsedConditionsDataForBarChart}
          keys={['value']}
          indexBy='condition'
          margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
          padding={0.1}
          labelFormat='.3f'
          layout='horizontal'
          colors={['rgba(65, 15, 94, 0.8)']}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value',
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
