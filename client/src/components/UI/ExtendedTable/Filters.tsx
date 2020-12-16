import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import SingleSelect from 'components/UI/SingleSelect/SingleSelect';
import RangeSlider from 'components/UI/RangeSlider/RangeSlider';

import { FiltersProps } from './types';
import { useStyles } from './styles/extendedTable';

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
      {filters.map(({ type, name, onIndex, defaultValueIndexes, options, min, max }) =>
        type === 'SingleSelect' ? (
          <SingleSelect
            key={name}
            name={name}
            options={options as any}
            onChange={(values, actionMeta) => onSingleSelectChange(values, actionMeta, onIndex)}
            className={classes.searchMultiSelect}
          />
        ) : type === 'MultiSelect' ? (
          <MultiSelect
            key={name}
            name={name}
            options={options as any}
            defaultValueIndexes={defaultValueIndexes}
            onChange={(values, actionMeta) => multiSelectOnChange(values, actionMeta, onIndex)}
            className={classes.multiSelect}
          />
        ) : type === 'RangeSlider' ? (
          <RangeSlider
            key={name}
            name={name}
            min={min as any}
            max={max as any}
            // @ts-ignore
            initialSmallNum={initialFilterValues[onIndex][0] as number}
            // @ts-ignore
            initialLargeNum={initialFilterValues[onIndex][1] as number}
            onChangeCommited={(event, values) => onSliderChangeCommited(event, values, onIndex)}
            className={classes.rangeSlider}
          />
        ) : null
      )}
    </>
  );
};

export default Filters;
