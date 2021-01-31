import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import NoResults from 'components/UI/NoResults/NoResults';
import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import GenericLegend from 'components/UI/GenericLegend/GenericLegend';
import { SelectOption } from 'components/UI/MultiSelect/types';

import Transcripts from './Transcripts/Transcripts';
import DetailedTranscripts from './DetailedTranscripts/DetailedTranscripts';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { parseDiscreteSliderMarks } from './helpers';
import { GeneNamesResponse, TranscriptsResponse } from '../types';
import { setGeneBrowserFilters } from 'actions';

const GeneBrowser = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const conditionTypes = useSelector((state: RootState) => state.conditionTypes);

  const filters = useSelector((state: RootState) => state.geneBrowserFilters);
  const [transcriptsData, setTranscriptsData] = useState<TranscriptsResponse>({
    transcripts: [],
    maximumPosition: 0,
    minimumPosition: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    fetchFromApi('/api/gene-browser/transcripts', { project, filters: filters as any }).then(
      (res: TranscriptsResponse) => {
        if (!isMounted || !res) return;

        setTranscriptsData(res);
        setLoading(false);
      }
    );

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

  const dispatch = useDispatch();

  const singleSelectOnChange = async (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    if (!selectedOption) {
      setTranscriptsData({
        transcripts: [],
        maximumPosition: 0,
        minimumPosition: 0,
      });
      return;
    }

    dispatch(setGeneBrowserFilters({ ...filters, gene: selectedOption.value }));
  };

  const tpmMarks = ['0', '0.1', '0.5', '1', '5'];

  const onMinTPMChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMinTPMValue = parseFloat(tpmMarks[value]);

    if (newMinTPMValue === filters.minTPM) return;

    dispatch(setGeneBrowserFilters({ ...filters, minTPM: newMinTPMValue }));
  };

  const qualityMarks = ['0', '100', '250', '500', '1000'];

  const onMinQualityChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMinQualValue = parseFloat(qualityMarks[value]);

    if (newMinQualValue === filters.minQual) return;

    dispatch(setGeneBrowserFilters({ ...filters, minQual: newMinQualValue }));
  };

  const conditionFilterOnChange = (selectedOption: SelectOption, _actionMeta: ActionMeta<any>) => {
    if (selectedOption.value === filters.condition) return;

    dispatch(setGeneBrowserFilters({ ...filters, condition: selectedOption.value }));
  };

  return (
    <ProjectItemCard
      name={`Transcript browser for ${filters.gene}`}
      className={classes.projectItemCard}
      {...props}
    >
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          options={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          defaultInputValue='ACAT2'
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
        <DiscreteSlider
          name='Min. TPM'
          defaultValue={0.5}
          marks={parseDiscreteSliderMarks(tpmMarks)}
          onChangeCommited={onMinTPMChangeCommited}
        />
        <DiscreteSlider
          name='Min. Quality'
          defaultValue={250}
          marks={parseDiscreteSliderMarks(qualityMarks)}
          onChangeCommited={onMinQualityChangeCommited}
        />
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
          <Transcripts transcriptsData={transcriptsData} />
          <DetailedTranscripts transcriptsData={transcriptsData} />
        </>
      )}
    </ProjectItemCard>
  );
};

export default GeneBrowser;
