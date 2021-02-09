import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import NoResults from 'components/UI/NoResults/NoResults';
import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import ContinuousSlider from 'components/UI/ContinuousSlider/ContinuousSlider';
// import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import GenericLegend from 'components/UI/GenericLegend/GenericLegend';
import { SelectOption } from 'components/UI/MultiSelect/types';

import Transcripts from './Transcripts/Transcripts';
import DetailedTranscripts from './DetailedTranscripts/DetailedTranscripts';

import { fetchFromApi, usePrevious } from 'utils';
import { useStyles } from './styles';
// import { parseDiscreteSliderMarks } from './helpers';
import { GeneNamesResponse, TranscriptsResponse } from '../types';
import {
  clearGeneBrowserTranscriptVisibility,
  setGeneBrowserFilters,
  setGeneBrowserTranscriptVisibility,
  setGeneBrowserTranscriptsData,
  setGeneBrowserScrollJumpPosition,
} from 'actions';

const GeneBrowser = () => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  // Initial values are set in the reducer
  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const [transcriptsData, setTranscriptsData] = useState<TranscriptsResponse>({
    transcripts: [],
    maximumPosition: 0,
    minimumPosition: 0,
  });
  // Max mean TPM value for the selected filters (aside from TPM)
  const [maxTPM, setMaxTPM] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Just to give it some initial values
  // So that the users will instantly see something
  useEffect(() => {
    dispatch(setGeneBrowserFilters({ gene: 'ACAT2', minTPM: 0, minQual: 0, condition: conditionTypes[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionTypes]);

  const prevFiltersGene = usePrevious(filters.gene);

  useEffect(() => {
    // Don't try to fetch before these values are initialized
    if (!filters.condition || !filters.gene || !project) return;

    let isMounted = true;

    setLoading(true);

    Promise.all([
      fetchFromApi('/api/gene-browser/transcripts', { project, filters }),
      fetchFromApi('/api/gene-browser/max-tpm', { project, filters }),
    ]).then(([resTranscripts, resMaxTpm]: [TranscriptsResponse, { maxTPM: number }]) => {
      if (!resTranscripts || !isMounted) return;
      setTranscriptsData(resTranscripts);

      setLoading(false);

      if (!resMaxTpm) return;
      setMaxTPM(resMaxTpm.maxTPM);

      const visibleTranscripts = resTranscripts.transcripts.map(({ transcriptId }) => ({
        transcriptId,
        isVisible: true,
      }));

      dispatch(setGeneBrowserTranscriptsData(resTranscripts));
      dispatch(clearGeneBrowserTranscriptVisibility());
      dispatch(setGeneBrowserTranscriptVisibility(visibleTranscripts));

      // Only scroll to start of the transcript if the user changed gene
      if (filters.gene !== prevFiltersGene) {
        dispatch(setGeneBrowserScrollJumpPosition(resTranscripts.minimumPosition));
      }
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, filters]);

  const fetchSingleSelectOptions = async (inputValue: string) => {
    const geneNames: GeneNamesResponse = await fetchFromApi('/api/gene-browser/gene-names', {
      project,
      searchInput: inputValue,
    });

    // Single select component accepts data in this format
    return geneNames.map(({ _id }) => ({ value: _id, label: _id }));
  };

  const singleSelectOnChange = async (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    if (!selectedOption) {
      setTranscriptsData({
        transcripts: [],
        maximumPosition: 0,
        minimumPosition: 0,
      });
      return;
    }

    dispatch(setGeneBrowserFilters({ ...filters, minTPM: 0, minQual: 0, gene: selectedOption.value }));
  };

  // const qualityMarks = ['0', '100', '250', '500', '1000'];

  // const onMinQualityChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
  //   const newMinQualValue = parseFloat(qualityMarks[value]);

  //   if (newMinQualValue === filters.minQual) return;

  //   dispatch(setGeneBrowserFilters({ ...filters, minQual: newMinQualValue }));
  // };

  const onMinTPMChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    if (value === filters.minTPM) return;

    dispatch(setGeneBrowserFilters({ ...filters, minTPM: value }));
  };

  const conditionFilterOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    if (selectedOption.value === filters.condition) return;

    dispatch(setGeneBrowserFilters({ ...filters, condition: selectedOption.value }));
  };

  const hideAllTranscripts = () => {
    const transcripts = transcriptsData.transcripts.map(({ transcriptId }) => ({
      transcriptId,
      isVisible: false,
    }));

    dispatch(setGeneBrowserTranscriptVisibility(transcripts));
  };

  const showAllTranscripts = () => {
    const transcripts = transcriptsData.transcripts.map(({ transcriptId }) => ({
      transcriptId,
      isVisible: true,
    }));

    dispatch(setGeneBrowserTranscriptVisibility(transcripts));
  };

  return (
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
        <SingleSelect
          name='Condition'
          onChange={conditionFilterOnChange}
          className={classes.singleSelect}
          isAsync={false}
          options={conditionTypes}
          defaultInputValue={filters.condition}
        />
        <ContinuousSlider
          name='Min. Mean TPM'
          initialValue={filters.minTPM}
          min={0}
          max={Math.floor(maxTPM)}
          onChangeCommited={onMinTPMChangeCommited}
        />
        {/* <DiscreteSlider
          name='Min. Quality'
          defaultValue={filters.minQual}
          marks={parseDiscreteSliderMarks(qualityMarks)}
          onChangeCommited={onMinQualityChangeCommited}
        /> */}
        <GenericLegend
          items={['Exon', 'CDS', 'Peptide', 'Mutation', 'Mod']}
          colors={['#336', '#F8E58E', 'rgba(200, 85, 61, 0.6)', '#ED0909', 'rgba(40, 82, 56, 0.7)']}
          direction='vertical'
        />
      </div>
      {loading ? (
        <Loading className={classes.loading} />
      ) : transcriptsData.transcripts.length === 0 ? (
        <NoResults className={classes.noResults} />
      ) : (
        <>
          <div className={classes.hideShowTranscriptsButtonsContainer}>
            <IconButton
              className={classes.hideAllTranscriptsButton}
              aria-label='hide all transcripts'
              component='span'
              onClick={hideAllTranscripts}
              title='Hide all transcripts'
            >
              <VisibilityOffIcon className={classes.hideTranscriptButtonIcon} />
              <span>Hide All</span>
            </IconButton>
            <IconButton
              className={classes.showAllTranscriptsButton}
              aria-label='show all transcripts'
              component='span'
              onClick={showAllTranscripts}
              title='Show all transcripts'
            >
              <VisibilityIcon className={classes.hideTranscriptButtonIcon} />
              <span>Show All</span>
            </IconButton>
          </div>
          <Transcripts />
          <DetailedTranscripts />
        </>
      )}
    </ProjectItemCard>
  );
};

export default GeneBrowser;
