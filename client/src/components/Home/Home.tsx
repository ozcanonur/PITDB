import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Hero, { HeroBg } from './Hero';
import DatabaseStatistics from './DatabaseStatistics';
import Flow from './Flow';
import Publish from './Publish';

import { useStyles } from './styles/home';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <HeroBg />
      <main className={classes.home}>
        <Header />
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
