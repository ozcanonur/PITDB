import { combineReducers } from 'redux';
import { ACTION, UpdateBrowseFilterOptionAction } from 'actions/types';

// const browseFilterOptions = (state: BrowseFilterOptions = {}, action: UpdateBrowseFilterOptionAction) => {
//   switch (action.type) {
//     case ACTION.UPDATE_BROWSE_FILTER_OPTIONS:
//       const { filterName, selectedFilterOptions } = action.payload;
//       if (selectedFilterOptions.length === 0) {
//         delete state[filterName];
//         return { ...state };
//       } else return { ...state, [filterName]: selectedFilterOptions };
//     default:
//       return state;
//   }
// };

export default combineReducers({
  // browseFilterOptions,
});
