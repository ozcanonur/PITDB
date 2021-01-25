import TranscriptViewer from './TranscriptViewer/TranscriptViewer';

import { useStyles } from './styles';

const GeneBrowserWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TranscriptViewer />
    </div>
  );
};

export default GeneBrowserWrapper;
