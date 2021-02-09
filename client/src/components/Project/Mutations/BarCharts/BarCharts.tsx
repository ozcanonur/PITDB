import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import BarChart from 'components/UI/BarChart/BarChart';
import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { ConditionsResponse } from './types';

const BarCharts = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene, position } = useSelector((state: RootState) => state.selectedMutation);

  const [conditionsData, setConditionsData] = useState<ConditionsResponse>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!gene || !position) return;

    setLoading(true);

    fetchFromApi('/api/mutations/conditions', { project, gene, position }).then((res: ConditionsResponse) => {
      if (!isMounted || !res) return;

      setConditionsData(res);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gene, position, project]);

  // Bar chart wants data in this format
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
      <ProjectItemCard
        name={`Quality for ${gene} at ${position.toLocaleString()}`}
        className={classes.projectItemCard}
      >
        <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
        <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
          <AutoSizer>
            {({ width, height }) => (
              <BarChart
                data={qualityData}
                keys={['qual']}
                indexBy='sample'
                colors={['rgba(107, 107, 179, 0.65)']}
                bottomAxisText='Quality'
                leftAxisText='Sample'
                width={width}
                height={height}
              />
            )}
          </AutoSizer>
        </div>
      </ProjectItemCard>
      <ProjectItemCard
        name={`Allele frequency for ${gene} at ${position.toLocaleString()}`}
        className={classes.projectItemCard}
      >
        <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
        <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
          <AutoSizer>
            {({ width, height }) => (
              <BarChart
                data={alleleFrequencyData}
                keys={['AF']}
                indexBy='sample'
                colors={['rgba(44, 85, 122, 0.7)']}
                bottomAxisText='Allele Frequency'
                leftAxisText='Sample'
                width={width}
                height={height}
              />
            )}
          </AutoSizer>
        </div>
      </ProjectItemCard>
    </>
  );
};

export default BarCharts;
