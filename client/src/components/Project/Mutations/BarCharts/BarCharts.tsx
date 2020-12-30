import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { ConditionsResponse } from './types';

const BarCharts = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene, position } = useSelector((state: RootState) => state.selectedMutation);

  const [conditionsData, setConditionsData] = useState<ConditionsResponse>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!gene || !position) return;

    setLoading(true);

    fetchFromApi('/api/mutations/conditions', { project, gene, position }).then((res: ConditionsResponse) => {
      if (!isMounted || !res) return;

      setConditionsData(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gene, position, project]);

  // Bar chart wants data in this format
  const qualityData = Object.keys(conditionsData).map((conditionName) => ({
    sample: conditionName,
    qual: conditionsData[conditionName].qual,
  }));

  const alleleFrequencyData = Object.keys(conditionsData).map((conditionName) => ({
    sample: conditionName,
    AF: conditionsData[conditionName].AF,
  }));

  return (
    <>
      <ProjectItemCard
        name={`Quality for ${gene} at ${position.toLocaleString()}`}
        className={classes.projectItemCard}
      >
        <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
        <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
          <ResponsiveBar
            enableGridX={false}
            enableGridY
            data={qualityData}
            keys={['qual']}
            indexBy='sample'
            margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
            padding={0.1}
            layout='horizontal'
            colors={[
              'rgba(107, 107, 179, 0.65)',
              'rgba(65, 15, 94, 0.8)',
              'rgba(44, 85, 122, 0.7)',
              '#2C557A',
            ]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Quality',
              legendPosition: 'middle',
              legendOffset: 40,
              tickValues: 5,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Sample',
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
      <ProjectItemCard
        name={`Allele frequency for ${gene} at ${position.toLocaleString()}`}
        className={classes.projectItemCard}
      >
        <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
        <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
          <ResponsiveBar
            enableGridX={false}
            enableGridY
            data={alleleFrequencyData}
            keys={['AF']}
            indexBy='sample'
            margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
            padding={0.1}
            layout='horizontal'
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['rgba(44, 85, 122, 0.7)']}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Allele Frequency',
              legendPosition: 'middle',
              legendOffset: 40,
              tickValues: 5,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Sample',
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
    </>
  );
};

export default BarCharts;
