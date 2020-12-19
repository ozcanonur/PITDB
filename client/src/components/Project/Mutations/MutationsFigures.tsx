import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ResponsiveBar } from '@nivo/bar';
import { useSelector } from 'react-redux';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { ConditionsData } from './types';
import { fetchFromApi } from 'utils';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& > div:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  qualityPlotContainer: {
    marginLeft: '2rem',
    width: '38rem',
    height: '30rem',
  },
}));

const MutationsFigures = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const [conditionsData, setConditionsData] = useState<ConditionsData>({});

  const { gene, position } = useSelector((state: RootState) => state.selectedMutation);

  useEffect(() => {
    let mounted = true;

    if (gene && position) {
      fetchFromApi('/api/mutations/quality', { projectId, gene, position }).then((res) => {
        if (mounted && res) {
          setConditionsData(res);
        }
      });
    }

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
    <div className={classes.container}>
      <ProjectItemCard name='Quality' className={classes.qualityPlotContainer}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={qualityData}
          keys={['qual']}
          indexBy='sample'
          margin={{ top: 20, bottom: 100, left: 60, right: 20 }}
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
      </ProjectItemCard>
      <ProjectItemCard name='Allele Frequency' className={classes.qualityPlotContainer}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={alleleFrequencyData}
          keys={['AF']}
          indexBy='sample'
          margin={{ top: 20, bottom: 100, left: 60, right: 20 }}
          padding={0.1}
          layout='horizontal'
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['rgba(107, 107, 179, 0.7)', '#410F5E', '#4C6587', '#2C557A']}
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
      </ProjectItemCard>
    </div>
  );
};

export default MutationsFigures;
