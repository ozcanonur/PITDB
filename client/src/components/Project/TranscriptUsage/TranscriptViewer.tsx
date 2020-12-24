import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TranscriptViewerRail from 'components/UI/Svg/TranscriptViewerRail/TranscriptViewerRail';
import Loading from 'components/UI/Loading/Loading';

import { Transcripts } from './types';
import { fetchFromApi } from 'utils';
import { COLORS } from 'variables/transcriptViewerColors';
import { useStyles } from './styles/transcriptViewer';

const TranscriptViewer = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);

  const [transcriptsData, setTranscriptsData] = useState<Transcripts>({
    transcripts: [],
    maximumPosition: 0,
    minimumPosition: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!gene) return;

    setLoading(true);

    fetchFromApi('/api/transcriptUsage/transcripts', { project, gene }).then((res) => {
      if (!mounted || !res) return;

      setTranscriptsData(res);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [project, gene]);

  return (
    <div className={classes.transcriptViewerContainer} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.transcriptRails} style={{ opacity: loading ? 0 : 1 }}>
        {transcriptsData.transcripts.map((transcript, index) => (
          <TranscriptViewerRail
            key={transcript.transcriptId}
            transcriptData={{
              transcript: transcript,
              minimumPosition: transcriptsData.minimumPosition,
              maximumPosition: transcriptsData.maximumPosition,
            }}
            color={COLORS[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default TranscriptViewer;
