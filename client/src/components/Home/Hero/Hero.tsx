import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';

const Hero = ({ ...props }) => {
  const classes = useStyles();

  const history = useHistory();

  const navToBrowse = () => {
    history.push('/browse');
  };

  return (
    <section className={classes.heroContainer} {...props}>
      <h1 className={classes.heading}>PIT Experiments Database</h1>
      <p className={classes.secondaryHeading}>
        PITDB is a platform for sharing of results from PIT (proteomics informed by transcriptomics) experiments.
      </p>
      <div className={classes.browseButton} onClick={navToBrowse}>
        Browse
      </div>
    </section>
  );
};

export default Hero;
