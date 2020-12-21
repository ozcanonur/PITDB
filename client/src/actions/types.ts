import { fromPairs } from 'lodash';
import { MutationTableFilters } from 'components/Project/Mutations/types';

export enum ACTION {
  SELECT_MUTATION,
  SET_MUTATION_FILTERS_ACTION,
}
export type SelectMutationAction = {
  type: ACTION.SELECT_MUTATION;
  payload: {
    gene: string;
    position: string;
  };
};

export type SetMutationFiltersAction = {
  type: ACTION.SET_MUTATION_FILTERS_ACTION;
  payload: MutationTableFilters;
};
