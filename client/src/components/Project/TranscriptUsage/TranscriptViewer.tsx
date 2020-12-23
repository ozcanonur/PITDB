import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TranscriptViewerRail from 'components/UI/Svg/TranscriptViewerRail';

import { Transcripts } from './types';
import { fetchFromApi } from 'utils';

import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  transcriptViewerContainer: {
    padding: '2rem',
    display: 'flex',
  },
  transcriptRails: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateZ(0)',

    '& > svg:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  transcriptRail: {},
}));

const TranscriptViewer = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);

  const [transcriptsData, setTranscriptsData] = useState<Transcripts>({
    transcripts: [],
    maximumPosition: 0,
    minimumPosition: 0,
  });

  useEffect(() => {
    let mounted = true;

    fetchFromApi('/api/transcriptUsage/transcripts', { project, gene }).then((res) => {
      if (!mounted || !res) return;

      setTranscriptsData(res);
    });

    return () => {
      mounted = false;
    };
  }, [project, gene]);

  // Remove this
  if (transcriptsData.transcripts.length === 0) return null;

  return (
    <div className={classes.transcriptViewerContainer} {...props}>
      <div className={classes.transcriptRails}>
        {transcriptsData.transcripts.map((transcript) => (
          <TranscriptViewerRail
            key={transcript.transcriptId}
            className={classes.transcriptRail}
            transcriptData={{
              transcript: transcript,
              minimumPosition: transcriptsData.minimumPosition,
              maximumPosition: transcriptsData.maximumPosition,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TranscriptViewer;
