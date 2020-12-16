import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import { useStyles } from './styles/API';

const API = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.container}>
        <main className={classes.api}>
          <div className={classes.headingContainer}>
            <h2 className={classes.heading}>API</h2>
            <p className={classes.subHeading}>You can query our public API routes specified below.</p>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default API;
