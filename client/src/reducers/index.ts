import { combineReducers } from 'redux';
import { ACTION, UpdateBrowseProjectControl } from 'actions/types';

const initialBrowseProjectControl = {
  'Mutations table': true,
  'Sample quality': false,
  'Allele frequency': false,
  'Variant distribution': false,
};

const browseProjectControl = (
  state: BrowseProjectControl = initialBrowseProjectControl,
  action: UpdateBrowseProjectControl
) => {
  switch (action.type) {
    case ACTION.UPDATE_BROWSE_PROJECT_CONTROL:
      const { controlName } = action.payload;
      // @ts-ignore
      return { ...state, [controlName]: !state[controlName] };
    default:
      return state;
  }
};

export default combineReducers({
  browseProjectControl,
});

// export const projectSidebarControls = [
//   {
//     category: 'Mutations',
//     items: ['Mutations Table', 'Sample quality', 'Allele frequency', 'Variant distribution'],
//   },
//   {
//     category: 'Browser',
//     items: ['Genome browser', 'Gene browser'],
//   },
//   {
//     category: 'Differential gene expression',
//     items: ['Volcano plot', 'Plot 2'],
//   },
//   {
//     category: 'Splicing events',
//     items: ['Splicing events table', 'Type distribution', 'Domains', 'Representation'],
//   },
//   {
//     category: 'Transcript usage',
//     items: ['Transcript usage table', 'Plot 1', 'Line plot'],
//   },
//   {
//     category: 'Peptide maps',
//     items: ['Peptide maps table', 'Something', 'Something else', 'Something else', 'Something else'],
//   },
// ];
