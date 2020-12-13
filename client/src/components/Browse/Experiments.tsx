import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';

import { useStyles } from './styles/experiments';
import { options, options2, options3, searchOptions } from 'variables/browseFilterOptions';
import { tableData } from 'variables/browseTableData';

const Experiments = () => {
  const classes = useStyles();

  // const selectOnChange = (selectedOptions: MultiSelectOption[], actionMeta: ActionMeta<any>) => {
  //   // if (!selectedOptions) return;
  //   // const currentlySelectedValues = selectedOptions.map((option) => option.value);
  //   // dispatch(updateBrowseFilterOptions(actionMeta.name as string, currentlySelectedValues));
  // };

  const clickableCells: {
    [key: string]: (field: string) => void;
  } = {
    '1': () => {},
    '2': () => {},
  };

  return (
    <section className={classes.container}>
      <div className={classes.filtersContainer}>
        <MultiSelect options={options} name='Species' defaultValueIndex={0} />
        <MultiSelect options={options2} name='Cell Line' />
        <MultiSelect options={options3} name='Another filter' />
        <SingleSelect options={searchOptions} name='Search' containerProps={{ className: classes.searchMultiSelect }} />
        {/* <MultiSelect
          options={options3}
          name='Search'
          containerProps={{ className: classes.searchMultiSelect }}
          multiSelectProps={{ menuIsOpen: false }}
        /> */}
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
