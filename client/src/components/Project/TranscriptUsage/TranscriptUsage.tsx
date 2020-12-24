import { useEffect } from 'react';
import AOS from 'aos';

import TranscriptUsageTable from './Table';
import Figures from './Figures';

import { useStyles } from './styles/transcriptUsage';

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
