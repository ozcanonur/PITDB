import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import { fetchFromApi } from 'utils';
import { TranscriptReadCount } from './types';

import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    transform: 'translateX(-15rem)',
  },
  figureContainer: {
    transition: 'all .3s ease-in-out',
    height: '100%',
    width: '40rem',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
  },
}));

const BarChart = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { transcript } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscript);

  const [transcriptReadCounts, setTranscriptReadCounts] = useState<TranscriptReadCount[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!transcript) return;

    setLoading(true);

    fetchFromApi('/api/transcript-usages/read-counts', { project, transcript }).then((res) => {
      if (!mounted || !res) return;

      setTranscriptReadCounts(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [project, transcript]);

  return (
    <div className={classes.container}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={transcriptReadCounts}
          keys={['readCount']}
          indexBy='condition'
          margin={{ top: 20, bottom: 75, left: 60, right: 40 }}
          padding={0.1}
          labelFormat='.1f'
          layout='horizontal'
          colors={['rgba(107, 107, 179, 0.65)', 'rgba(44, 85, 122, 0.7)', 'rgba(65, 15, 94, 0.8)']}
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
            legendOffset: -50,
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
    </div>
  );
};

export default BarChart;
