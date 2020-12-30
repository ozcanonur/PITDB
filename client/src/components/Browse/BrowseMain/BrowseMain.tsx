import Footer from 'components/Footer/Footer';

import Examples from '../Examples/Examples';
import Experiments from '../Experiments/Experiments';

import { useStyles } from './styles';

const BrowseMain = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <main className={classes.browse}>
        <div className={classes.headingContainer} data-aos='fade-in'>
          <h2 className={classes.heading}>Browse</h2>
          <p className={classes.subHeading}>
            Check out the examples or search for a specific experiment below.
          </p>
        </div>
        <Examples />
        <Experiments />
        <Footer />
      </main>
    </div>
  );
};

export default BrowseMain;
