import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import NoResults from 'components/UI/NoResults/NoResults';
import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import ContinuousSlider from 'components/UI/ContinuousSlider/ContinuousSlider';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import GenericLegend from 'components/UI/GenericLegend/GenericLegend';
import { SelectOption } from 'components/UI/MultiSelect/types';

import Transcripts from './Transcripts/Transcripts';
import DetailedTranscripts from './DetailedTranscripts/DetailedTranscripts';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { parseDiscreteSliderMarks } from './helpers';
import { GeneNamesResponse, TranscriptsResponse } from './types';
import {
  clearGeneBrowserTranscriptVisibility,
  setGeneBrowserFilters,
  setGeneBrowserTranscriptVisibility,
  setGeneBrowserTranscriptsData,
  setGeneBrowserScrollJumpPosition,
} from 'actions';

const GeneBrowser = () => {
  const classes = useStyles();

  // Project ID of the current route
  const { project } = useParams<{ project: string }>();

  // Initial values are set in the reducer
  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const transcriptsData = useSelector((state: RootState) => state.geneBrowserTranscriptsData);
  // Max mean TPM value for the selected filters (aside from the TPM filter obv.)
  const [maxTPM, setMaxTPM] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // useStore is just like useSelector but it doesn't trigger rerenders on update
  const store = useStore();

  // Refetch on filters change
  useEffect(() => {
    if (!filters.gene || !project) return;

    let isMounted = true;

    setLoading(true);

    Promise.all([
      fetchFromApi('/api/gene-browser/transcripts', { project, filters }),
      fetchFromApi('/api/gene-browser/max-tpm', { project, filters }),
    ]).then(([resTranscripts, resMaxTpm]: [TranscriptsResponse, { maxTPM: number }]) => {
      if (!resTranscripts || !isMounted) return;

      setLoading(false);

      if (!resMaxTpm) return;
      setMaxTPM(resMaxTpm.maxTPM);

      dispatch(setGeneBrowserTranscriptsData(resTranscripts));

      // Only scroll to the start if it's a different gene
      // And it wasn't a redirect from tables (right most button in other tab's tables)
      const { redirectFromTables } = store.getState().geneBrowserScrollJumpPosition;
      if (redirectFromTables || resTranscripts.minimumPosition === transcriptsData.minimumPosition) return;

      dispatch(setGeneBrowserScrollJumpPosition(resTranscripts.minimumPosition, false));
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, filters]);

  // Only clear and show all transcripts if it's a different gene, and not on the first mount
  // This is to persist visibility across mounts
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    dispatch(clearGeneBrowserTranscriptVisibility());

    const visibleTranscripts = transcriptsData.transcripts.map(({ transcriptId }) => ({
      transcriptId,
      isVisible: true,
    }));
    dispatch(setGeneBrowserTranscriptVisibility(visibleTranscripts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptsData.minimumPosition]);

  // Search filter
  const fetchSingleSelectOptions = async (inputValue: string) => {
    const geneNames: GeneNamesResponse = await fetchFromApi('/api/gene-browser/gene-names', {
      project,
      searchInput: inputValue,
    });

    // Single select component accepts data in this format
    return geneNames.map(({ _id }) => ({ value: _id, label: _id }));
  };

  const singleSelectOnChange = async (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    if (!selectedOption || selectedOption.value === filters.gene) {
      return;
    }

    dispatch(setGeneBrowserFilters({ ...filters, minTPM: 0, minQual: 0, gene: selectedOption.value }));
  };

  // Mutation quality filter
  const qualityMarks = ['0', '100', '250', '500', '1000'];
  const onMinQualityChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMinQualValue = parseFloat(qualityMarks[value]);

    if (newMinQualValue === filters.minQual) return;

    dispatch(setGeneBrowserFilters({ ...filters, minQual: newMinQualValue }));
  };

  const onMinTPMChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    if (value === filters.minTPM) return;

    dispatch(setGeneBrowserFilters({ ...filters, minTPM: value }));
  };

  return (
    <main className={classes.geneBrowserContainer}>
      <ProjectItemCard
        name={`Gene browser for ${filters.gene}`}
        className={classes.projectItemCard}
        style={{ minHeight: loading || transcriptsData.transcripts.length === 0 ? '75vh' : 'auto' }}
      >
        <div className={classes.filtersContainer}>
          <SingleSelect
            name='Search gene'
            options={fetchSingleSelectOptions}
            onChange={singleSelectOnChange}
            defaultInputValue={filters.gene}
            className={classes.singleSelect}
          />
          <ContinuousSlider
            name='Min. Mean TPM'
            initialValue={filters.minTPM}
            min={0}
            max={Math.floor(maxTPM)}
            onChangeCommited={onMinTPMChangeCommited}
          />
          <DiscreteSlider
            name='Min. Mutation Quality'
            defaultValue={qualityMarks.indexOf(filters.minQual.toString())}
            marks={parseDiscreteSliderMarks(qualityMarks)}
            onChangeCommited={onMinQualityChangeCommited}
          />
          <GenericLegend
            items={['Exon', 'CDS', 'Peptide', 'Mutation', 'Mod']}
            colors={['#336', '#F8E58E', 'rgba(200, 85, 61, 0.6)', '#ED0909', '#798478']}
            direction='vertical'
          />
        </div>
        {loading ? (
          <Loading className={classes.loading} />
        ) : transcriptsData.transcripts.length === 0 ? (
          <NoResults className={classes.noResults} />
        ) : (
          <>
            <Transcripts />
            <DetailedTranscripts />
          </>
        )}
      </ProjectItemCard>
    </main>
  );
};

export default GeneBrowser;
