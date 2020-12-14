import { ChangeEvent } from 'react';
import { ActionMeta, OptionsType, ValueType } from 'react-select';

import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import RangeSlider from 'components/UI/RangeSlider/RangeSlider';

import { useStyles } from './styles/extendedTable';

interface Filter {
  type: 'SingleSelect' | 'MultiSelect' | 'RangeSlider';
  name: string;
  defaultValueIndex?: number;
  options?: OptionsType<any>;
  min?: number;
  max?: number;
}

interface FiltersProps {
  filters?: Filter[];
  multiSelectOnChange: (values: ValueType<any, any>, actionMeta: ActionMeta<any>) => void;
  onSliderChangeCommited: (_event: ChangeEvent<{}>, values: [number, number], sliderName: string) => void;
}

const Filters = ({ filters, multiSelectOnChange, onSliderChangeCommited }: FiltersProps) => {
  const classes = useStyles();

  if (!filters) return null;

  return (
    <>
      {filters.map(({ type, name, defaultValueIndex, options, min, max }) =>
        type === 'SingleSelect' ? (
          <SingleSelect key={name} name={name} options={options as any} className={classes.searchMultiSelect} />
        ) : type === 'MultiSelect' ? (
          <MultiSelect
            key={name}
            name={name}
            options={options as any}
            defaultValueIndex={defaultValueIndex}
            onChange={multiSelectOnChange}
            className={classes.multiSelect}
          />
        ) : type === 'RangeSlider' ? (
          <RangeSlider
            key={name}
            name={name}
            min={min as any}
            max={max as any}
            initialMin={10000}
            initialMax={55000}
            onChangeCommited={onSliderChangeCommited}
            className={classes.rangeSlider}
          />
        ) : null
      )}
    </>
  );
};

export default Filters;
