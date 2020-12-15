import { ChangeEvent } from 'react';
import { ActionMeta, OptionsType, ValueType } from 'react-select';

import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import RangeSlider from 'components/UI/RangeSlider/RangeSlider';

import { useStyles } from './styles/extendedTable';

interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValueIndexes?: number[];
  options?: OptionsType<any>;
  min?: number;
  max?: number;
}

interface FiltersProps {
  filters?: Filter[];
  onSingleSelectChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  multiSelectOnChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  onSliderChangeCommited: (_event: ChangeEvent<{}>, values: [number, number], sliderName: string) => void;
  initialFilterValues: FilterTableBy;
}

interface FilterTableBy {
  [filterName: string]: string[] | [number, number];
}

const Filters = ({
  filters,
  onSingleSelectChange,
  multiSelectOnChange,
  onSliderChangeCommited,
  initialFilterValues,
}: FiltersProps) => {
  const classes = useStyles();

  if (!filters) return null;

  return (
    <>
      {filters.map(({ type, name, defaultValueIndexes, options, min, max }) =>
        type === 'SingleSelect' ? (
          <SingleSelect
            key={name}
            name={name}
            options={options as any}
            onChange={onSingleSelectChange}
            className={classes.searchMultiSelect}
          />
        ) : type === 'MultiSelect' ? (
          <MultiSelect
            key={name}
            name={name}
            options={options as any}
            defaultValueIndexes={defaultValueIndexes}
            onChange={multiSelectOnChange}
            className={classes.multiSelect}
          />
        ) : type === 'RangeSlider' ? (
          <RangeSlider
            key={name}
            name={name}
            min={min as any}
            max={max as any}
            initialSmallNum={initialFilterValues[name][0] as number}
            initialLargeNum={initialFilterValues[name][1] as number}
            onChangeCommited={onSliderChangeCommited}
            className={classes.rangeSlider}
          />
        ) : null
      )}
    </>
  );
};

export default Filters;
