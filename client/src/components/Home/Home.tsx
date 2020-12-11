import Header from 'components/Header/Header';
import Hero, { HeroBg } from './Hero';
import DatabaseStatistics from './DatabaseStatistics';
import Flow from './Flow';
import Publish from './Publish';

import { useStyles } from './styles/home';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeContainer}>
      <HeroBg />
      <div className={classes.home}>
        <Header />
        <Hero />
        <DatabaseStatistics />
        <Flow />
        <Publish />
      </div>
    </div>
  );
};

export default Home;
