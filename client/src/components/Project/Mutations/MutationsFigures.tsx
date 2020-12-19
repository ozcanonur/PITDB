import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import { FiguresData } from './types';
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
  loading: {
    marginTop: '3rem',
  },
}));

const MutationsFigures = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);

  const [figuresData, setFiguresData] = useState<FiguresData>({
    conditions: {},
    types: {
      SNP: 0,
      DEL: 0,
      INS: 0,
    },
  });

  const { gene, position } = useSelector((state: RootState) => state.selectedMutation);

  useEffect(() => {
    let mounted = true;

    if (gene && position) {
      setLoading(true);

      fetchFromApi('/api/mutations/figures', { projectId, gene, position }).then((res) => {
        if (mounted && res) {
          setFiguresData(res);
          setLoading(false);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [gene, position, projectId]);

  const { conditions, types } = figuresData;

  const qualityData = Object.keys(conditions).map((conditionName) => ({
    sample: conditionName,
    qual: conditions[conditionName].qual,
  }));

  const alleleFrequencyData = Object.keys(conditions).map((conditionName) => ({
    sample: conditionName,
    AF: conditions[conditionName].AF,
  }));

  const typeDistributionData = Object.keys(types).map((type) => ({
    id: type,
    label: type,
    // @ts-ignore
    value: types[type],
  }));

  return (
    <div className={classes.container}>
      <ProjectItemCard
        name={`Variant type distribution for ${gene} at ${position.toLocaleString()}`}
        className={classes.qualityPlotContainer}
      >
        {loading ? (
          <Loading className={classes.loading} />
        ) : (
          <ResponsivePie
            data={typeDistributionData}
            margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
            innerRadius={0.4}
            padAngle={3}
            cornerRadius={0}
            colors={['rgba(107, 107, 179, 0.65)', 'rgba(65, 15, 94, 0.8)', '#2C557A']}
            borderWidth={0}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsSkipAngle={0}
            radialLabelsTextColor='#333333'
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor='white'
            theme={{
              fontFamily: 'Poppins, sans-serif',
              textColor: 'rgb(51,51,102)',
            }}
          />
        )}
      </ProjectItemCard>
      <ProjectItemCard
        name={`Quality for ${gene} at ${position.toLocaleString()}`}
        className={classes.qualityPlotContainer}
      >
        {loading ? (
          <Loading className={classes.loading} />
        ) : (
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
        )}
      </ProjectItemCard>
      <ProjectItemCard
        name={`Allele frequency for ${gene} at ${position.toLocaleString()}`}
        className={classes.qualityPlotContainer}
      >
        {loading ? (
          <Loading className={classes.loading} />
        ) : (
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
            colors={['rgba(65, 15, 94, 0.8)']}
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
        )}
      </ProjectItemCard>
    </div>
  );
};

export default MutationsFigures;
