import { combineReducers } from 'redux';

import {
  ACTION,
  SelectMutationAction,
  SetMutationFiltersAction,
  SetDGEFiltersAction,
  SelectDGEAction,
  SetSplicingEventsFiltersAction,
  SelectSplicingEventAction,
  SetTranscriptUsageFiltersAction,
  SelectTranscriptUsageAction,
  SelectTranscriptViewerTranscriptAction,
  SelectTranscriptViewerTranscriptColorAction,
  SetGeneBrowserFiltersAction,
  SelectGeneBrowserGeneAction,
} from 'actions/types';

import { MutationTableFilters } from 'components/Project/Mutations/Table/types';
import { DGETableFilters } from 'components/Project/DGE/Table/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/Table/types';
import { TranscriptUsageTableFilters } from 'components/Project/TranscriptUsage/Table/types';
import { GeneBrowserFilters } from 'components/Project/GeneBrowser/TranscriptViewer/types';

const mutationFilters = (
  state: MutationTableFilters = {
    gene: '',
    variantType: ['SNP', 'DEL', 'INS'],
    inCDS: ['true'],
    hasPeptideEvidence: ['false'],
    isSynonymous: ['true', 'false'],
  },
  action: SetMutationFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_MUTATION_FILTERS:
      return { ...action.payload };
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
      return { ...action.payload };
    default:
      return state;
  }
};

const DGEFilters = (
  state: DGETableFilters = { symbol: '', maxPValue: 0.05, minAbsFoldChange: 1 },
  action: SetDGEFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_DGE_FILTERS:
      return { ...action.payload };
    default:
      return state;
  }
};

const selectedDGE = (state: { symbol: string } = { symbol: '' }, action: SelectDGEAction) => {
  switch (action.type) {
    case ACTION.SELECT_DGE:
      return { ...action.payload };
    default:
      return state;
  }
};

const splicingEventsFilters = (
  state: SplicingEventsTableFilters = {
    gene: '',
    maxPValue: 0.05,
    hasPeptideEvidence: ['true'],
    strand: ['-', '+'],
  },
  action: SetSplicingEventsFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_SPLICING_EVENTS_FILTERS:
      return { ...action.payload };
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
      return { ...action.payload };
    default:
      return state;
  }
};

const transcriptUsageFilters = (
  state: TranscriptUsageTableFilters = { gene: '', maxPValue: 0.05, hasPeptideEvidence: ['true', 'false'] },
  action: SetTranscriptUsageFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_TRANSCRIPT_USAGE_FILTERS:
      return { ...action.payload };
    default:
      return state;
  }
};

const selectedTranscriptUsage = (
  state: { gene: string; transcript: string } = { gene: '', transcript: '' },
  action: SelectTranscriptUsageAction
) => {
  switch (action.type) {
    case ACTION.SELECT_TRANSCRIPT_USAGE:
      return { ...action.payload };
    default:
      return state;
  }
};

const selectedTranscriptViewerTranscript = (
  state: { transcript: string } = { transcript: '' },
  action: SelectTranscriptViewerTranscriptAction
) => {
  switch (action.type) {
    case ACTION.SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT:
      return { ...action.payload };
    default:
      return state;
  }
};

const selectedTranscriptViewerTranscriptColor = (
  state: { color: string } = { color: '#336' },
  action: SelectTranscriptViewerTranscriptColorAction
) => {
  switch (action.type) {
    case ACTION.SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT_COLOR:
      return { ...action.payload };
    default:
      return state;
  }
};

const geneBrowserFilters = (
  state: GeneBrowserFilters = { conditions: ['Nsi'], minQual: 250, minTPM: 0.5 },
  action: SetGeneBrowserFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_FILTERS:
      return { ...action.payload };
    default:
      return state;
  }
};

const selectedGeneBrowserGene = (
  state: { gene: string } = { gene: 'BIRC2' },
  action: SelectGeneBrowserGeneAction
) => {
  switch (action.type) {
    case ACTION.SELECT_GENE_BROWSER_GENE:
      return { ...action.payload };
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
  transcriptUsageFilters,
  selectedTranscriptUsage,
  selectedTranscriptViewerTranscript,
  selectedTranscriptViewerTranscriptColor,
  geneBrowserFilters,
  selectedGeneBrowserGene,
});
