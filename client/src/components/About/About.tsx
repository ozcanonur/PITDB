import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import { useStyles } from './styles/about';

const About = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.container}>
        <main className={classes.about}>
          <div className={classes.headingContainer}>
            <h2 className={classes.heading}>About</h2>
            <p className={classes.subHeading}>Learn more about PITDB, and the motivation behind it.</p>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default About;
