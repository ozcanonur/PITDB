import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConditionsByGeneNameResponse } from './types';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import ConfidenceIntervalChartSvg from 'components/Project/TranscriptUsage/ConfidenceIntervalChart/ConfidenceIntervalChartSvg/ConfidenceIntervalChartSvg';
import Loading from 'components/UI/Loading/Loading';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';

const ConfidenceChart = ({ ...props }) => {
  const classes = useStyles();

  // Project ID of the current route
  const { project } = useParams<{ project: string }>();
  // Currently selected gene from the table
  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);
  // Currently selected transcript from the transcript visual list
  const { transcript } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscript);

  const [conditionsData, setConditionsData] = useState({});
  const [loading, setLoading] = useState(false);

  // Refetch on gene chaange
  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/transcript-usages/conditions-by-gene-name', {
      project,
      gene,
    }).then((res: ConditionsByGeneNameResponse) => {
      if (!isMounted || !res) return;

      setConditionsData(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, gene]);

  return (
    <ProjectItemCard
      name={`95% Confidence interval for ${transcript}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.confidenceIntervalChartContainer} style={{ opacity: loading ? 0 : 1 }}>
        <ConfidenceIntervalChartSvg data={conditionsData} />
      </div>
    </ProjectItemCard>
  );
};

export default ConfidenceChart;
