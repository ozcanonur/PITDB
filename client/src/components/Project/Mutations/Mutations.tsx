import MutationsTable from './MutationsTable';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff)',
    flexGrow: 1,
    padding: '2rem',
  },
}));

const Mutations = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MutationsTable />
    </div>
  );
};

export default Mutations;
