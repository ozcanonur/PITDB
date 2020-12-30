import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResponsiveBar } from '@nivo/bar';
import tinyColor from 'tinycolor2';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Loading from 'components/UI/Loading/Loading';
import { fetchFromApi } from 'utils';
import { TranscriptReadCountsResponse } from './types';
import { useStyles } from './styles';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { transcript } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscript);
  const { color } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscriptColor);

  const [transcriptReadCounts, setTranscriptReadCounts] = useState<TranscriptReadCountsResponse>([]);
  const [barChartColor, setBarChartColor] = useState('#336');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!transcript) return;

    setLoading(true);

    fetchFromApi('/api/transcript-usages/read-counts', {
      project,
      transcript,
    }).then((res: TranscriptReadCountsResponse) => {
      if (!isMounted || !res) return;

      setTranscriptReadCounts(res);
      setBarChartColor(String(tinyColor(color).setAlpha(0.8)));
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, transcript]);

  return (
    <ProjectItemCard name={`Read counts for ${transcript}`} className={classes.projectItemCard} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ResponsiveBar
          enableGridX={false}
          enableGridY
          data={transcriptReadCounts}
          keys={['readCount']}
          indexBy='condition'
          margin={{ top: 20, bottom: 100, left: 60, right: 40 }}
          padding={0.1}
          labelFormat='.1f'
          layout='horizontal'
          colors={[barChartColor]}
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
    </ProjectItemCard>
  );
};

export default BarChart;
