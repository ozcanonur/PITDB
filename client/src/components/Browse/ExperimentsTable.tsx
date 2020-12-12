import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ActionMeta } from 'react-select';

import MultiSelect from './MultiSelect';
import { updateBrowseFilterOptions } from 'actions';

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

const ExperimentsTable = () => {
  const classes = useStyles();

  const selectedBrowseFilterOptions = useSelector((state: RootState) => state.browseFilterOptions);

  console.log(selectedBrowseFilterOptions);

  const dispatch = useDispatch();

  const selectOnChange = (selectedOptions: MultiSelectOption[], actionMeta: ActionMeta<any>) => {
    if (!selectedOptions) return;

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    dispatch(updateBrowseFilterOptions(actionMeta.name as string, currentlySelectedValues));
  };

  return (
    <section className={classes.container}>
      <div className={classes.filtersContainer}>
        <MultiSelect options={options} name='Species' onChange={selectOnChange} />
        <MultiSelect options={options2} name='Cell Line' onChange={selectOnChange} />
        <MultiSelect options={options3} name='Another filter' onChange={selectOnChange} />
      </div>
    </section>
  );
};

export default ExperimentsTable;
