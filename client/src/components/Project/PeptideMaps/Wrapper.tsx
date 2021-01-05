import { useStyles } from './styles';

const PeptideMapsWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.placeholder}>Peptide Maps, soon.</div>
    </div>
  );
};

export default PeptideMapsWrapper;
