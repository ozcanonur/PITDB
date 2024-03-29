import { useEffect } from 'react';
import AOS from 'aos';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Hero from './Hero/Hero';
import DatabaseStatistics from './DatabaseStatistics/DatabaseStatistics';
import Flow from './Flow/Flow';
import Publish from './Publish/Publish';

import HeroImg from 'assets/hero_dna.svg';
import { useStyles } from './styles';

const Home = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heroBg} />
      <Header />
      <main className={classes.home}>
        <img
          className={classes.heroImg}
          src={HeroImg}
          alt='dna'
          data-aos='fade-left'
          data-aos-duration='1200'
        />
        <Hero data-aos='fade-right' data-aos-duration='1200' />
        <DatabaseStatistics data-aos='fade-up' data-aos-duration='1200' />
        <Flow data-aos='fade-right' />
        <Publish data-aos='fade-up' />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
