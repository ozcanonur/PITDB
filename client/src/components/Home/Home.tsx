import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Hero from './Hero';
import DatabaseStatistics from './DatabaseStatistics';
import Flow from './Flow';
import Publish from './Publish';

import HeroImg from 'assets/hero_dna.svg';
import { useStyles } from './styles/home';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heroBg} />
      <Header />
      <main className={classes.home}>
        <img className={classes.heroImg} src={HeroImg} alt='dna' />
        <Hero />
        <DatabaseStatistics />
        <Flow />
        <Publish />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
