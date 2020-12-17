import makeStyles from '@material-ui/core/styles/makeStyles';

import ProjectInfo from './ProjectInfo';

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    minHeight: '100vh',
    borderRight: `1.3px solid rgba(51, 51, 102, 0.3)`,
  },
}));

const Sidebar = ({ projectId }: { projectId: string }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarContainer}>
      <ProjectInfo projectId={projectId} />
    </div>
  );
};

export default Sidebar;
