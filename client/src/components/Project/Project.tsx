import { useParams } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Sidebar from './Sidebar/Sidebar';
import Content from './Content';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff',
  },
}));

const Project = () => {
  const classes = useStyles();

  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className={classes.container}>
      <Sidebar projectId={projectId} />
      <Content />
    </div>
  );
};

export default Project;
