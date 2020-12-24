import { useSelector } from 'react-redux';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';

import makeStyles from '@material-ui/core/styles/makeStyles';

import TranscriptViewer from './TranscriptViewer';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2rem',
    marginRight: '1rem',
  },
}));

const Figures = ({ ...props }) => {
  const classes = useStyles();

  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);

  return (
    <ProjectItemCard className={classes.container} name={`Transcript Viewer for ${gene}`} {...props}>
      <TranscriptViewer />
    </ProjectItemCard>
  );
};

export default Figures;
