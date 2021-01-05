import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import tinyColor from 'tinycolor2';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Loading from 'components/UI/Loading/Loading';
import ConfidenceBarChart from 'components/UI/ConfidenceBarChart/ConfidenceBarChart';

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
      setBarChartColor(String(tinyColor(color).setAlpha(0.65)));
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
        <ConfidenceBarChart
          barChartData={transcriptReadCounts}
          axisBottomLabel='Read count'
          axisLeftLabel='Condition'
          labelFormat='.2f'
          barColor={[barChartColor]}
        />
      </div>
    </ProjectItemCard>
  );
};

export default BarChart;
