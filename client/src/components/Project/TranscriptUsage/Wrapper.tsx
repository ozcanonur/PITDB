import TranscriptViewer from './TranscriptViewer/TranscriptViewer';
import BarChart from './BarChart/BarChart';
import ConfidenceIntervalChart from './ConfidenceIntervalChart/ConfidenceIntervalChart';

import TranscriptUsageTable from './Table/Table';

import { useStyles } from './styles';

const TranscriptUsageWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TranscriptViewer />
      <div className={classes.tableAndFigures}>
        <TranscriptUsageTable />
        <div className={classes.figuresContainer}>
          <BarChart />
          <ConfidenceIntervalChart />
        </div>
      </div>
    </div>
  );
};

export default TranscriptUsageWrapper;
