import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import tinyColor from 'tinycolor2';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import Loading from 'components/UI/Loading/Loading';
import ConfidenceBarChart from 'components/UI/ConfidenceBarChart/ConfidenceBarChart';

import { fetchFromApi } from 'utils';
import { TranscriptReadCountsResponse } from './types';
import { useStyles } from './styles';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  // Project ID of the current route
  const { project } = useParams<{ project: string }>();
  // Currently selected transcript from the table
  const { transcript } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscript);
  // Currently selected transcript's color to match colors of charts
  const { color } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscriptColor);

  const [transcriptReadCounts, setTranscriptReadCounts] = useState<TranscriptReadCountsResponse>([]);
  const [barChartColor, setBarChartColor] = useState('#336');
  const [loading, setLoading] = useState(false);

  // Refetch on transcript change
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
    <ProjectItemCard
      name={`Normalised read counts for ${transcript}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <ConfidenceBarChart
              barChartData={transcriptReadCounts}
              axisBottomLabel='Normalised read count'
              axisLeftLabel='Condition'
              labelFormat='.2f'
              barColor={[barChartColor]}
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    </ProjectItemCard>
  );
};

export default BarChart;
