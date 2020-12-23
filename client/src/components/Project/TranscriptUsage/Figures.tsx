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

  return (
    <ProjectItemCard className={classes.container} name='Transcript Viewer' {...props}>
      <TranscriptViewer />
    </ProjectItemCard>
  );
};

export default Figures;
