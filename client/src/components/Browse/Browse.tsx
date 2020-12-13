import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Examples from './Examples';
import Experiments from './Experiments';

import { useStyles } from './styles/browse';

const Browse = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <>
      <div className={classes.heroBg} />
      <Header />
      <div className={classes.container}>
        <main className={classes.browse}>
          <div className={classes.headingContainer} data-aos='fade-in'>
            <h2 className={classes.heading}>Browse</h2>
            <p className={classes.subHeading}>Check out the examples or search for a specific experiment below.</p>
          </div>
          <Examples data-aos='zoom-in' data-aos-duration='300' />
          <Experiments />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Browse;
