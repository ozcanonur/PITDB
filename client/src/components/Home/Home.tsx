import Header from 'components/Header/Header';
import Hero, { HeroBg } from './Hero';

import { useStyles } from './styles/home';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeContainer}>
      <HeroBg />
      <div className={classes.home}>
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default Home;
