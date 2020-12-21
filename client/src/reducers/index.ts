import { combineReducers } from 'redux';
import { ACTION, SelectMutationAction, SetMutationFiltersAction } from 'actions/types';
import { MutationTableFilters } from 'components/Project/Mutations/types';

const selectedMutation = (
  state: { gene: string; position: string } = { gene: '', position: '' },
  action: SelectMutationAction
) => {
  switch (action.type) {
    case ACTION.SELECT_MUTATION:
      const { gene, position } = action.payload;
      return { gene, position };
    default:
      return state;
  }
};

const mutationFilters = (
  state: MutationTableFilters = {
    type: ['SNP'],
    inCDS: ['true'],
    hasPeptideEvidence: ['false'],
  },
  action: SetMutationFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_MUTATION_FILTERS_ACTION:
      const newFilters = action.payload;
      return { ...newFilters };
    default:
      return state;
  }
};

export default combineReducers({
  selectedMutation,
  mutationFilters,
});
