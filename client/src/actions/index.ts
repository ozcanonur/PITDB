import { ACTION, SelectMutationAction, SetMutationFiltersAction } from './types';
import { MutationTableFilters } from 'components/Project/Mutations/types';

export const selectMutation = (gene: string, position: string): SelectMutationAction => {
  return {
    type: ACTION.SELECT_MUTATION,
    payload: {
      gene,
      position,
    },
  };
};

export const setMutationFilters = (filters: MutationTableFilters): SetMutationFiltersAction => {
  return {
    type: ACTION.SET_MUTATION_FILTERS_ACTION,
    payload: filters,
  };
};
