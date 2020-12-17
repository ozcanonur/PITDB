import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import MutationsTable from './Mutations/MutationsTable';

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2.5rem',
    minHeight: '100vh',
    flexGrow: 1,
  },
}));

const Content = () => {
  const classes = useStyles();

  const browseProjectControl = useSelector((state: RootState) => state.browseProjectControl);

  return <div className={classes.container}>{browseProjectControl['Mutations table'] ? <MutationsTable /> : null}</div>;
};

export default Content;
