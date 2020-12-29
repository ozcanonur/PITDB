import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import TranscriptSvg from 'components/Project/TranscriptUsage/TranscriptViewer/TranscriptSvg';
import Loading from 'components/UI/Loading/Loading';

import { TranscriptsData } from './types';
import { fetchFromApi } from 'utils';
import { COLORS } from 'variables/transcriptViewerColors';
import { useStyles } from './styles';

const TranscriptViewer = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene } = useSelector((state: RootState) => state.selectedTranscriptUsage);

  const [transcriptsData, setTranscriptsData] = useState<TranscriptsData>({
    transcripts: [],
    maximumPosition: 0,
    minimumPosition: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchTranscriptsData = async (mounted: boolean) => {
    setLoading(true);

    const res: TranscriptsData = await fetchFromApi('/api/transcript-usages/transcripts', { project, gene });

    if (!mounted || !res) return;

    setTranscriptsData(res);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    if (!gene) return;

    fetchTranscriptsData(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, gene]);

  return (
    <ProjectItemCard name={`Transcript viewer for ${gene}`} className={classes.projectItemCard} {...props}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.transcriptViewerContainer}>
        <div className={classes.transcriptRails} style={{ opacity: loading ? 0 : 1 }}>
          {transcriptsData.transcripts.map((transcript, index) => (
            <TranscriptSvg
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
    </ProjectItemCard>
  );
};

export default TranscriptViewer;
