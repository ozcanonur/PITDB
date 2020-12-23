import { useEffect } from 'react';
import AOS from 'aos';

import TranscriptUsageTable from './Table';

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
      <div className={classes.figuresContainer} data-aos='fade-in'></div>
    </div>
  );
};

export default SplicingEvents;
