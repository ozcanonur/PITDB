import { ReactWrapper } from 'enzyme';
import { uniq, isEqual } from 'lodash';

import MultiSelect from 'components/UI/MultiSelect/MultiSelect';
import { mountExtendedTable, getColumnValues, replaceAll, getTableRows } from './helpers';

let wrapped: ReactWrapper;
beforeEach(() => {
  wrapped = mountExtendedTable();
});

describe('Extended table', () => {
  it('applies filters correctly on load', () => {
    // Index 0 = 'Human', 'Rat'
    let columnValues: string[] | number[] = getColumnValues(wrapped, 0);
    expect(isEqual(uniq(columnValues), ['Human', 'Rat'])).toBeTruthy();

    // Index 1 = 'Medium'
    columnValues = getColumnValues(wrapped, 1);
    expect(isEqual(uniq(columnValues), ['Medium'])).toBeTruthy();

    // Index 6 = Slider [10000, 55000]
    columnValues = getColumnValues(wrapped, 6);
    columnValues = columnValues.map((value) => parseInt(replaceAll(value, ',', '')));
    const isBetweenSliderValues = columnValues.every((value) => value >= 10000 && value <= 55000);
    expect(isBetweenSliderValues).toBeTruthy();
  });

  it('renders multiSelect menu options correctly', () => {
    const human = wrapped.find('[data-test="Human-removeButton"]');
    expect(human).toHaveLength(1);

    const rat = wrapped.find('[data-test="Rat-removeButton"]');
    expect(rat).toHaveLength(1);

    const medium = wrapped.find('[data-test="Medium-removeButton"]');
    expect(medium).toHaveLength(1);
  });
});

describe('Multi select', () => {
  it('filters correctly on multiselect option remove', () => {
    const removeButton = wrapped.find('[data-test="Human-removeButton"]');

    removeButton.simulate('click');
    wrapped.update();

    const columnValues = getColumnValues(wrapped, 0);
    expect(columnValues.includes('Human')).toBeFalsy();
  });

  // Menu is open is needed, click doesn't render the menu for some reason
  it('filters correctly on multiselect option add', () => {
    wrapped.find(MultiSelect).at(0).find('StateManager').instance().setState({ menuIsOpen: true });
    wrapped.update();

    const menu = wrapped.find('[data-test="Species-menu"]');
    const bovinOption = menu.findWhere((node) => node.type() === 'div' && node.text() === 'Bovin');

    bovinOption.simulate('click');
    wrapped.update();

    const columnValues = getColumnValues(wrapped, 0);
    expect(columnValues.includes('Bovin')).toBeTruthy();
  });

  it('renders empty table on all multiselect in one filter removed', () => {
    const humanOption = wrapped.find('[data-test="Human-removeButton"]');
    humanOption.simulate('click');

    const ratOption = wrapped.find('[data-test="Rat-removeButton"]');
    ratOption.simulate('click');
    wrapped.update();

    const rows = getTableRows(wrapped);

    expect(rows).toHaveLength(0);
  });
});

// describe('Range slider', () => {
//   it('filters correctly on change', () => {
//     const slider = wrapped.find(Slider);
//     slider.simulate('change', { values: [20000, 46000] });
//     wrapped.update();

//     let columnValues: string[] | number[] = getColumnValues(wrapped, 6);
//     columnValues = columnValues.map((value) => parseInt(replaceAll(value, ',', '')));

//     console.log(columnValues);

//     expect(columnValues.every((value) => value >= 20000 && value <= 46000)).toBeTruthy();
//   });
// });

// describe('Single select', () => {
//   it('displays all available values as options', async () => {
//     wrapped.find(SingleSelect).find('StateManager').instance().setState({ menuIsOpen: true });
//     wrapped.update();

//     await wait(() => expect(getByText('EXP10008')).toBeInTheDocument());

//     const menuList = wrapped.find('[data-test="singleSelect-menuList"]');

//     console.log(menuList.debug());
//   });
// });
