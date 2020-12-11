import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Examples from './Examples';

import { useStyles } from './styles/browse';

const Browse = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heroBg} />
      <main className={classes.browse}>
        <Header />
        <div className={classes.headingContainer}>
          <h2 className={classes.heading}>Browse</h2>
          <p className={classes.subHeading}>Check out the examples or search for a specific experiment below.</p>
        </div>
        <Examples />
        <Footer />
      </main>
    </div>
  );
};

export default Browse;
