import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import NoResults from 'components/UI/NoResults/NoResults';
import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import GenericLegend from 'components/UI/GenericLegend/GenericLegend';
import { SelectOption } from 'components/UI/MultiSelect/types';

// import TranscriptSvg from './TranscriptSvg/TranscriptSvg';
import DetailedTranscriptSvg from './DetailedTranscriptSvg/DetailedTranscriptSvg';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { parseDiscreteSliderMarks } from './helpers';
import { GeneNamesResponse, TranscriptsResponse } from './types';
import { setGeneBrowserFilters } from 'actions';

const TranscriptViewer = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();

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

  const multiSelectOnChange = (
    selectedOptions: SelectOption[],
    _actionMeta: ActionMeta<any>,
    name: string
  ) => {
    const newSelectedValues = (selectedOptions || []).map((option) => option.value);
    dispatch(setGeneBrowserFilters({ ...filters, [name]: newSelectedValues }));
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
          defaultInputValue='BIRC2'
          className={classes.singleSelect}
        />
        <div className={classes.filtersSubContainer}>
          <MultiSelect
            name='Condition'
            options={[
              { value: 'Nsi', label: 'Nsi' },
              { value: 'si', label: 'si' },
            ]}
            defaultValues={['Nsi', 'si']}
            onChange={(selectedOptions, _actionMeta) =>
              multiSelectOnChange(selectedOptions, _actionMeta, 'conditions')
            }
            className={classes.multiSelect}
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
        </div>
        <GenericLegend
          items={['Exon', 'CDS', 'Mutation']}
          colors={['#336', '#F8E58E', '#C8553D']}
          direction='vertical'
        />
      </div>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <NoResults
        className={classes.noResults}
        style={{ opacity: !loading && transcriptsData.transcripts.length === 0 ? 1 : 0 }}
      />
      <div
        className={classes.transcriptViewerContainer}
        style={{ opacity: !loading && transcriptsData.transcripts.length !== 0 ? 1 : 0 }}
      >
        {/* <div className={classes.transcriptRails}>
          {transcriptsData.transcripts.map((transcript) => (
            <TranscriptSvg
              key={transcript.transcriptId}
              transcriptData={{
                transcript: transcript,
                minimumPosition: transcriptsData.minimumPosition,
                maximumPosition: transcriptsData.maximumPosition,
              }}
            />
          ))}
        </div> */}
        <div className={classes.transcriptRails} style={{ direction: 'ltr' }}>
          {transcriptsData.transcripts.map((transcript, index) => {
            if (index > 0) return null;

            return (
              <div className={classes.detailedTranscriptContainer} key={transcript.transcriptId}>
                <DetailedTranscriptSvg
                  transcriptData={{
                    transcript,
                    minimumPosition: transcriptsData.minimumPosition,
                    maximumPosition: transcriptsData.maximumPosition,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </ProjectItemCard>
  );
};

export default TranscriptViewer;
