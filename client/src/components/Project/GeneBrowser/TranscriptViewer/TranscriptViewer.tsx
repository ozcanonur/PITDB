import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import Loading from 'components/UI/Loading/Loading';
import ProjectItemCard from 'components/UI/ProjectItemCard/ProjectItemCard';
import DiscreteSlider from 'components/UI/DiscreteSlider/DiscreteSlider';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import { SelectOption } from 'components/UI/MultiSelect/types';
import TranscriptSvg from './TranscriptSvg';

import { fetchFromApi } from 'utils';
import { useStyles } from './styles';
import { parseDiscreteSliderMarks } from './helpers';
import { GeneNamesResponse, TranscriptsResponse } from './types';
import { setGeneBrowserFilters, selectGeneBrowserGene } from 'actions';

const TranscriptViewer = ({ ...props }) => {
  const classes = useStyles();

  const { project } = useParams<{ project: string }>();
  const { gene } = useSelector((state: RootState) => state.selectedGeneBrowserGene);

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

    fetchFromApi('/api/gene-browser/transcripts', { project, gene, filters: filters as any }).then(
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
  }, [project, gene, filters]);

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

    dispatch(selectGeneBrowserGene(selectedOption.value));
  };

  const tpmMarks = ['0', '0.1', '0.5', '1', '5'];

  const qualityMarks = ['0', '100', '300', '400', '1000'];

  const onMinTPMChangeCommited = (_event: ChangeEvent<{}>, value: number) => {
    const newMinTPMValue = parseFloat(tpmMarks[value]);
    dispatch(setGeneBrowserFilters({ ...filters, minTPM: newMinTPMValue }));
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
    <ProjectItemCard name={`Transcript viewer`} className={classes.projectItemCard} {...props}>
      <div className={classes.filtersContainer}>
        <SingleSelect
          name='Search gene'
          options={fetchSingleSelectOptions}
          onChange={singleSelectOnChange}
          className={classes.singleSelect}
        />
        <div className={classes.filtersSubContainer}>
          <MultiSelect
            name='Condition'
            options={[
              { value: 'Nsi', label: 'Nsi' },
              { value: 'si', label: 'si' },
            ]}
            defaultValues={['Nsi']}
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
            defaultValue={0}
            marks={parseDiscreteSliderMarks(qualityMarks)}
            onChangeCommited={() => {}}
          />
        </div>
      </div>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <div className={classes.transcriptViewerContainer} style={{ opacity: loading ? 0 : 1 }}>
        <div className={classes.transcriptRails}>
          {transcriptsData.transcripts.map((transcript, index) => (
            <TranscriptSvg
              key={transcript.transcriptId}
              transcriptData={{
                transcript: transcript,
                minimumPosition: transcriptsData.minimumPosition,
                maximumPosition: transcriptsData.maximumPosition,
              }}
            />
          ))}
        </div>
      </div>
    </ProjectItemCard>
  );
};

export default TranscriptViewer;
