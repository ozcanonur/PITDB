import { useStyles } from './styles';

const PeptideMapsWrapper = () => {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <div className={classes.placeholder}>Peptide Maps, soon.</div>
    </main>
  );
};

export default PeptideMapsWrapper;
