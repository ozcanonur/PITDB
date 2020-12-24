import { useSelector } from 'react-redux';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import makeStyles from '@material-ui/core/styles/makeStyles';

import TranscriptViewer from './TranscriptViewer';
import BarChart from './BarChart';
import ConfidenceChart from './ConfidenceChart';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2rem',
    marginRight: '1rem',
  },
  figures: {
    display: 'flex',
    height: '30rem',
  },
}));

const Figures = ({ ...props }) => {
  const classes = useStyles();

  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);

  return (
    <ProjectItemCard className={classes.container} name={`Transcript Viewer for ${gene}`} {...props}>
      <div className={classes.figures}>
        <TranscriptViewer />
        <BarChart />
        <ConfidenceChart />
      </div>
    </ProjectItemCard>
  );
};

export default Figures;
