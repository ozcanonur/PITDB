import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AOS from 'aos';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import TranscriptViewer from './TranscriptViewer/TranscriptViewer';
import BarChart from './BarChart/BarChart';
import ConfidenceChart from './ConfidenceChart/ConfidenceChart';

import TranscriptUsageTable from './Table/Table';

import { useStyles } from './styles';

const TranscriptUsageWrapper = () => {
  const classes = useStyles();

  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <TranscriptUsageTable data-aos='fade-in' />
      <ProjectItemCard className={classes.figuresContainer} name={`Transcript Viewer for ${gene}`} data-aos='fade-in'>
        <div className={classes.figures}>
          <TranscriptViewer />
          <BarChart />
          <ConfidenceChart />
        </div>
      </ProjectItemCard>
    </div>
  );
};

export default TranscriptUsageWrapper;
