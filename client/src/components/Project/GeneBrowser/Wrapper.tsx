import { useEffect } from 'react';
import AOS from 'aos';

import TranscriptViewer from './TranscriptViewer/TranscriptViewer';

import { useStyles } from './styles';

const GeneBrowserWrapper = () => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <TranscriptViewer />
    </div>
  );
};

export default GeneBrowserWrapper;
