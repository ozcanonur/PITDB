import { useEffect } from 'react';
import AOS from 'aos';

import TranscriptUsageTable from './Table';
import Figures from './Figures';

import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #fff 25%, #f2f4ff)',
    flexGrow: 1,
    padding: '2rem',
    paddingBottom: '4rem',
    flexDirection: 'column',
  },
}));

const SplicingEvents = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <TranscriptUsageTable data-aos='fade-in' />
      <Figures data-aos='fade-in' />
    </div>
  );
};

export default SplicingEvents;
