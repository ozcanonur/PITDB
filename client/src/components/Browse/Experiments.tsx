import { useState, useEffect } from 'react';
import { ActionMeta } from 'react-select';

import Table from 'components/UI/Table/Table';
import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';

import { useStyles } from './styles/experiments';
import { options, options2, options3, searchOptions } from 'variables/browseFilterOptions';
import { sampleTableData } from 'variables/browseTableData';

const Experiments = () => {
  const classes = useStyles();

  const [filterTableBy, setFilterTableBy] = useState<GenericObject>({ Species: ['Human'] });
  const [tableData, setTableData] = useState(sampleTableData);

  const multiSelectOnChange = (selectedOptions: SelectOption[], actionMeta: ActionMeta<any>) => {
    if (!selectedOptions) return;

    const currentlySelectedValues = selectedOptions.map((option) => option.value);
    const filterName = actionMeta.name as string;
    const newFilters = { ...filterTableBy, [filterName]: currentlySelectedValues };

    setFilterTableBy(newFilters);
  };

  useEffect(() => {
    const newTableData = sampleTableData.filter((e) => filterTableBy['Species'].includes(e[0]));
    setTableData(newTableData);
  }, [filterTableBy]);

  const clickableCells: {
    [key: string]: (field: string) => void;
  } = {
    '1': () => {},
    '2': () => {},
  };

  return (
    <section className={classes.container}>
      <div className={classes.filtersContainer}>
        <MultiSelect options={options} name='Species' defaultValueIndex={0} onChange={multiSelectOnChange} />
        <MultiSelect options={options2} name='Some filter' onChange={multiSelectOnChange} />
        <MultiSelect options={options3} name='Another filter' onChange={multiSelectOnChange} />
        <SingleSelect options={searchOptions} name='Search' containerProps={{ className: classes.searchMultiSelect }} />
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
