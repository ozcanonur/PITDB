import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResponsiveBar } from '@nivo/bar';
import tinyColor from 'tinycolor2';

import Loading from 'components/UI/Loading/Loading';
import { fetchFromApi } from 'utils';
import { TranscriptReadCounts } from './types';
import { useStyles } from './styles';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { transcript } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscript);
  const { color } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscriptColor);

  const [transcriptReadCounts, setTranscriptReadCounts] = useState<TranscriptReadCounts>([]);
  const [loading, setLoading] = useState(false);

  const fetchReadCounts = async (mounted: boolean) => {
    setLoading(true);

    const res: TranscriptReadCounts = await fetchFromApi('/api/transcript-usages/read-counts', {
      project,
      transcript,
    });

    setLoading(false);

    if (!mounted || !res) return;

    setTranscriptReadCounts(res);
  };

  useEffect(() => {
    let mounted = true;

    if (!transcript) return;

    fetchReadCounts(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, transcript]);

  return (
    <div className={classes.container} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={transcriptReadCounts}
          keys={['readCount']}
          indexBy='condition'
          margin={{ top: 0, bottom: 50, left: 60, right: 40 }}
          padding={0.1}
          labelFormat='.1f'
          layout='horizontal'
          colors={[String(tinyColor(color).setAlpha(0.8))]}
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
