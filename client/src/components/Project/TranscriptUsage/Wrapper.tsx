import { useMediaQuery } from 'react-responsive';

import TranscriptViewer from './TranscriptViewer/TranscriptViewer';
import BarChart from './BarChart/BarChart';
import ConfidenceIntervalChart from './ConfidenceIntervalChart/ConfidenceIntervalChart';

import TranscriptUsageTable from './Table/Table';

import { useStyles } from './styles';

const TranscriptUsageWrapper = () => {
  const classes = useStyles();

  // For responsive
  const screenIsBelow1850 = useMediaQuery({ maxWidth: 1850 });

  return (
    <main className={classes.container}>
      <section className={classes.tableAndFigures}>
        <TranscriptUsageTable />
        {screenIsBelow1850 ? <TranscriptViewer /> : null}
        <div className={classes.figuresContainer}>
          <BarChart />
          <ConfidenceIntervalChart />
        </div>
      </section>
      {!screenIsBelow1850 ? <TranscriptViewer /> : null}
    </main>
  );
};

export default TranscriptUsageWrapper;
