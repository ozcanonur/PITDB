import TranscriptViewer from './TranscriptViewer/TranscriptViewer';
import DetailedTranscriptViewer from './TranscriptViewer/DetailedTranscriptViewer';

import { useStyles } from './styles';

const GeneBrowserWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DetailedTranscriptViewer />
      {/* <TranscriptViewer /> */}
    </div>
  );
};

export default GeneBrowserWrapper;
