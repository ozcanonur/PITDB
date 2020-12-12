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
  { value: 'Another property', label: 'Another property' },
  { value: 'Yet another property', label: 'Yet another property' },
];

const Experiments = () => {
  const classes = useStyles();

  const selectedBrowseFilterOptions = useSelector((state: RootState) => state.browseFilterOptions);

  // console.log(selectedBrowseFilterOptions);

  const dispatch = useDispatch();

  const selectOnChange = (selectedOptions: MultiSelectOption[], actionMeta: ActionMeta<any>) => {
    if (!selectedOptions) return;

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    dispatch(updateBrowseFilterOptions(actionMeta.name as string, currentlySelectedValues));
  };

  const tableData = [
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '19,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '1,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
    ['Human', 'SAMP0048', 'EXP00008', '5,488', '6,189', '52,221', '198,570', '9,243'],
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
        <MultiSelect options={options} name='Species' onChange={selectOnChange} />
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
