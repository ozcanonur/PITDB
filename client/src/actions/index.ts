import {
  ACTION,
  SelectMutationAction,
  SetMutationFiltersAction,
  SetDGEFiltersAction,
  SelectDGEAction,
  SetSplicingEventsFiltersAction,
  SelectSplicingEventAction,
} from './types';
import { MutationTableFilters } from 'components/Project/Mutations/types';
import { DGETableFilters } from 'components/Project/DGE/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/types';

export const setMutationFilters = (filters: MutationTableFilters): SetMutationFiltersAction => {
  return {
    type: ACTION.SET_MUTATION_FILTERS,
    payload: filters,
  };
};

export const selectMutation = (gene: string, position: string): SelectMutationAction => {
  return {
    type: ACTION.SELECT_MUTATION,
    payload: {
      gene,
      position,
    },
  };
};

export const setDGEFilters = (filters: DGETableFilters): SetDGEFiltersAction => {
  return {
    type: ACTION.SET_DGE_FILTERS,
    payload: filters,
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

export const setSplicingEventsFilters = (filters: SplicingEventsTableFilters): SetSplicingEventsFiltersAction => {
  return {
    type: ACTION.SET_SPLICING_EVENTS_FILTERS,
    payload: filters,
  };
};

export const selectSplicingEvent = (gene: string, dPSI: number): SelectSplicingEventAction => {
  return {
    type: ACTION.SELECT_SPLICING_EVENT,
    payload: {
      gene,
      dPSI,
    },
  };
};
