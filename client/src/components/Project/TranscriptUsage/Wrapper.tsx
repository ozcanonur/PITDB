import { useEffect } from 'react';
import AOS from 'aos';

import TranscriptViewer from './TranscriptViewer/TranscriptViewer';
import BarChart from './BarChart/BarChart';
import ConfidenceChart from './ConfidenceChart/ConfidenceChart';

import TranscriptUsageTable from './Table/Table';

import { useStyles } from './styles';

const TranscriptUsageWrapper = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <TranscriptViewer />
      <div className={classes.tableAndFigures}>
        <TranscriptUsageTable data-aos='fade-in' />
        <div className={classes.figuresContainer} data-aos='fade-in'>
          <BarChart />
          <ConfidenceChart />
        </div>
      </div>
    </div>
  );
};

export default TranscriptUsageWrapper;
