import ProjectInfo from './ProjectInfo';
import Control from './Control';

import { useStyles } from './styles/sidebar';

const Sidebar = ({ projectId }: { projectId: string }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarContainer}>
      <ProjectInfo projectId={projectId} />
      <Control />
    </div>
  );
};

export default Sidebar;
