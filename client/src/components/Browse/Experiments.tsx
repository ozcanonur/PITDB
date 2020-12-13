import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ActionMeta } from 'react-select';

import { updateBrowseFilterOptions } from 'actions';
import Table from 'components/UI/Table/Table';
import MultiSelect from './MultiSelect';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '12rem',
  },
  filtersContainer: {
    position: 'relative',
    display: 'flex',

    '& > div:not(:last-child)': {
      marginRight: '5rem',
    },
  },
  searchMultiSelect: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  tableContainer: {
    marginTop: '4rem',
    padding: '0 1.5rem',
    minHeight: '50rem',
  },
}));

const options = [
  { value: 'Human', label: 'Human' },
  { value: 'Rat', label: 'Rat' },
  { value: 'Mouse', label: 'Mouse' },
  { value: 'Bovin', label: 'Bovin' },
];

const options2 = [
  { value: 'MCF-7', label: 'MCF-7' },
  { value: 'HL-60', label: 'HL-60' },
  { value: 'NTERA2', label: 'NTERA2' },
];

const options3 = [
  { value: 'Property', label: 'Property' },
  { value: 'Some property', label: 'Some property' },
  { value: 'Another property', label: 'Another property' },
];

const Experiments = () => {
  const classes = useStyles();

  // const selectedBrowseFilterOptions = useSelector((state: RootState) => state.browseFilterOptions);

  // console.log(selectedBrowseFilterOptions);

  const dispatch = useDispatch();

  const selectOnChange = (selectedOptions: MultiSelectOption[], actionMeta: ActionMeta<any>) => {
    if (!selectedOptions) return;

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    dispatch(updateBrowseFilterOptions(actionMeta.name as string, currentlySelectedValues));
  };

  const tableData = [
    ['Human', 'SAMP0048', 'EXP10008', '51,488', '6,189', '52,221', '19,570', '9,243'],
    ['Human', 'SAMP1048', 'EXP20008', '422', '6,189', '52,213', '1,570', '9,243'],
    ['Human', 'SAMP2048', 'EXP30008', '1,111', '6,189', '5,221', '198,570', '9,243'],
    ['Human', 'SAMP3048', 'EXP40008', '42,512', '6,189', '52,111', '198,570', '9,243'],
    ['Human', 'SAMP4048', 'EXP50008', '12', '6,189', '72,221', '198,570', '9,243'],
    ['Human', 'SAMP5048', 'EXP60008', '921,232', '6,189', '12,221', '198,570', '9,243'],
    ['Human', 'SAMP6048', 'EXP70008', '5,592', '6,189', '3,221', '198,570', '9,243'],
    ['Human', 'SAMP7048', 'EXP80008', '9,123', '6,189', '12,521', '198,570', '9,243'],
    ['Human', 'SAMP8048', 'EXP90008', '12,521', '6,189', '2,221', '198,570', '9,243'],
    ['Human', 'SAMP9048', 'EXP12008', '3,321', '6,189', '52,225', '198,570', '9,243'],
    ['Human', 'SAMP1248', 'EXP13008', '671', '6,189', '52,222', '198,570', '9,243'],
    ['Human', 'SAMP1348', 'EXP14008', '5,488', '6,189', '52,229', '198,570', '9,243'],
    ['Human', 'SAMP1648', 'EXP15008', '9,922', '6,189', '2,223', '198,570', '9,243'],
  ];

  const clickableCells: {
    [key: string]: (field: string) => void;
  } = {
    '1': () => {},
    '2': () => {},
  };

  return (
    <section className={classes.container}>
      <div className={classes.filtersContainer}>
        <MultiSelect options={options} name='Species' onChange={selectOnChange} defaultValueIndex={0} />
        <MultiSelect options={options2} name='Cell Line' onChange={selectOnChange} />
        <MultiSelect options={options3} name='Another filter' onChange={selectOnChange} />
        <MultiSelect
          options={options3}
          name='Search'
          onChange={selectOnChange}
          containerProps={{ className: classes.searchMultiSelect }}
        />
      </div>
      <div className={classes.tableContainer}>
        <Table
          tableHead={[
            'Species',
            'Sample Accession',
            'Experiment Accession',
            'TGEs',
            'Transcripts',
            'Peptides',
            'PSMs',
            'Variations',
          ]}
          tableData={tableData}
          clickableCells={clickableCells}
        />
      </div>
    </section>
  );
};

export default Experiments;
