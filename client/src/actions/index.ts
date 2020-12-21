import { ACTION, SelectMutationAction, SetMutationFiltersAction, SetDGEFiltersAction, SelectDGEAction } from './types';
import { MutationTableFilters } from 'components/Project/Mutations/types';
import { DGETableFilters } from 'components/Project/DGE/types';

export const selectMutation = (gene: string, position: string): SelectMutationAction => {
  return {
    type: ACTION.SELECT_MUTATION,
    payload: {
      gene,
      position,
    },
  };
};

export const selectDGE = (symbol: string): SelectDGEAction => {
  return {
    type: ACTION.SELECT_DGE,
    payload: {
      symbol,
    },
  };
};

export const setMutationFilters = (filters: MutationTableFilters): SetMutationFiltersAction => {
  return {
    type: ACTION.SET_MUTATION_FILTERS,
    payload: filters,
  };
};

export const setDGEFilters = (filters: DGETableFilters): SetDGEFiltersAction => {
  return {
    type: ACTION.SET_DGE_FILTERS,
    payload: filters,
  };
};
