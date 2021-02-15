import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import ConfidenceBarChart from 'components/UI/ConfidenceBarChart/ConfidenceBarChart';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { ConditionsResponse } from './types';

const BarChart = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene, dPSI } = useSelector((state: RootState) => state.selectedSplicingEvent);

  const [conditionsData, setConditionsData] = useState<ConditionsResponse>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!gene || !dPSI) return;

    setLoading(true);

    fetchFromApi('/api/splicing-events/conditions', { project, gene, dPSI }).then(
      (res: ConditionsResponse) => {
        if (!isMounted || !res) return;

        setConditionsData(res);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gene, dPSI, project]);

  return (
    <ProjectItemCard
      name={`SplicingPsi for ${gene} with ${dPSI.toLocaleString()}`}
      className={classes.projectItemCard}
      {...props}
    >
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.figureContainer} style={{ opacity: loading ? 0 : 1 }}>
        <AutoSizer>
          {({ width, height }) => (
            <ConfidenceBarChart
              barChartData={conditionsData}
              axisBottomLabel='psi'
              axisLeftLabel='Condition'
              labelFormat='.3f'
              min={0}
              max={1}
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
