import HeroImg from 'assets/hero_dna.svg';
import { useStyles } from './styles/hero';

const Hero = () => {
  const classes = useStyles();

  return (
    <section className={classes.heroContainer}>
      <h1 className={classes.heading}>PIT Experiments Database</h1>
      <p className={classes.secondaryHeading}>
        PITDB is a platform for sharing of results from PIT (proteomics informed by transcriptomics) experiments.
      </p>
      <div className={classes.browseButton}>Browse</div>
    </section>
  );
};

export const HeroBg = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroBg}>
      <img className={classes.heroImg} src={HeroImg} alt='dna' />
    </div>
  );
};

export default Hero;
