import { combineReducers } from 'redux';
import {
  ACTION,
  SelectMutationAction,
  SetMutationFiltersAction,
  SetDGEFiltersAction,
  SelectDGEAction,
  SetSplicingEventsFiltersAction,
  SelectSplicingEventAction,
} from 'actions/types';
import { MutationTableFilters } from 'components/Project/Mutations/types';
import { DGETableFilters } from 'components/Project/DGE/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/types';

const mutationFilters = (
  state: MutationTableFilters = {
    type: ['SNP', 'DEL', 'INS'],
    inCDS: ['true'],
    hasPeptideEvidence: ['false'],
  },
  action: SetMutationFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_MUTATION_FILTERS:
      const newFilters = action.payload;
      return { ...newFilters };
    default:
      return state;
  }
};

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

const DGEFilters = (state: DGETableFilters = { maxPValue: 0.05, minAbsFoldChange: 1 }, action: SetDGEFiltersAction) => {
  switch (action.type) {
    case ACTION.SET_DGE_FILTERS:
      const newFilters = action.payload;
      return { ...newFilters };
    default:
      return state;
  }
};

const selectedDGE = (state: { symbol: string } = { symbol: '' }, action: SelectDGEAction) => {
  switch (action.type) {
    case ACTION.SELECT_DGE:
      const { symbol } = action.payload;
      return { symbol };
    default:
      return state;
  }
};

const splicingEventsFilters = (
  state: SplicingEventsTableFilters = { maxPValue: 0.05, hasPeptideEvidence: ['true'], strand: ['-', '+'] },
  action: SetSplicingEventsFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_SPLICING_EVENTS_FILTERS:
      const newFilters = action.payload;
      return { ...newFilters };
    default:
      return state;
  }
};

const selectedSplicingEvent = (
  state: { gene: string; dPSI: number } = { gene: '', dPSI: 0 },
  action: SelectSplicingEventAction
) => {
  switch (action.type) {
    case ACTION.SELECT_SPLICING_EVENT:
      const { gene, dPSI } = action.payload;
      return { gene, dPSI };
    default:
      return state;
  }
};

export default combineReducers({
  mutationFilters,
  selectedMutation,
  DGEFilters,
  selectedDGE,
  splicingEventsFilters,
  selectedSplicingEvent,
});
