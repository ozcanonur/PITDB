import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConditionsByGeneNameResponse } from './types';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import ConfidenceChartSvg from 'components/Project/TranscriptUsage/ConfidenceChart/ConfidenceChartSvg/ConfidenceChartSvg';
import Loading from 'components/UI/Loading/Loading';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';

const ConfidenceChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);
  const { transcript } = useSelector((state: RootState) => state.selectedTranscriptViewerTranscript);

  const [conditionsData, setConditionsData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchConditions = async (mounted: boolean) => {
    setLoading(true);

    const res: ConditionsByGeneNameResponse = await fetchFromApi(
      '/api/transcript-usages/conditions-by-gene-name',
      {
        project,
        gene,
      }
    );

    setLoading(false);

    if (!res || !mounted) return;

    setConditionsData(res);
  };

  useEffect(() => {
    let mounted = true;

    fetchConditions(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, gene]);

  return (
    <ProjectItemCard
      name={`95% Confidence Interval for ${transcript}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div
        style={{
          padding: '2.5rem 1rem 5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loading ? 0 : 1,
        }}
      >
        <ConfidenceChartSvg style={{ height: '100%' }} data={conditionsData} />
      </div>
    </ProjectItemCard>
  );
};

export default ConfidenceChart;
