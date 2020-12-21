import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { ConditionsData } from './types';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles/figures';

const MutationsFigures = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const { gene, position } = useSelector((state: RootState) => state.selectedMutation);

  const [conditionsData, setConditionsData] = useState<ConditionsData>({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!gene || !position) return;

    setLoading(true);

    fetchFromApi('/api/mutations/conditions', { projectId, gene, position }).then((res) => {
      if (!mounted || !res) return;

      setConditionsData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [gene, position, projectId]);

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
      <ProjectItemCard name={`Quality for ${gene} at ${position.toLocaleString()}`} className={classes.projectItemCard}>
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
            colors={['rgba(107, 107, 179, 0.65)', '#410F5E', '#4C6587', '#2C557A']}
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
            }}
          />
        </div>
      </ProjectItemCard>
    </>
  );
};

export default MutationsFigures;
