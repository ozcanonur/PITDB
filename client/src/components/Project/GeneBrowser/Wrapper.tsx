import TranscriptViewer from './TranscriptViewer/TranscriptViewer';

import { useStyles } from './styles';

const GeneBrowserWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.geneBrowserContainer}>
      <TranscriptViewer />
    </div>
  );
};

export default GeneBrowserWrapper;
