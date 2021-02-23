import { combineReducers } from 'redux';
import uniqBy from 'lodash/uniqBy';

import {
  ACTION,
  SetConditionTypes,
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
  SetGeneBrowserTranscriptsData,
  SetGeneBrowserScrollPosition,
  SetGeneBrowserMouseoverPosition,
  SetGeneBrowserScrollJumpPosition,
  SetGeneBrowserTranscriptVisibility,
  ClearGeneBrowserTranscriptVisibility,
  SetGeneBrowserBoxHeight,
  SortGeneBrowserTranscripts,
  AddGeneBrowserVirtualRef,
  RemoveGeneBrowserVirtualRefsForTranscript,
} from 'actions/types';

import { MutationTableFilters } from 'components/Project/Mutations/Table/types';
import { DGETableFilters } from 'components/Project/DGE/Table/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/Table/types';
import { TranscriptUsageTableFilters } from 'components/Project/TranscriptUsage/Table/types';
import { GeneBrowserFilters, TranscriptsData } from 'components/Project/GeneBrowser/GeneBrowser/types';

import {
  initialMutationFilters,
  initialDgeFilters,
  initialSplicingEventsFilters,
  initialTranscriptUsageFilters,
  initialGeneBrowserFilters,
} from 'variables/initialTableFilters';
import { FixedSizeList } from 'react-window';

const conditionTypes = (state: string[] = [], action: SetConditionTypes) => {
  switch (action.type) {
    case ACTION.SET_CONDITION_TYPES:
      return [...action.payload];
    default:
      return state;
  }
};

const mutationFilters = (
  state: MutationTableFilters = initialMutationFilters,
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

const DGEFilters = (state: DGETableFilters = initialDgeFilters, action: SetDGEFiltersAction) => {
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
  state: SplicingEventsTableFilters = initialSplicingEventsFilters,
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
  state: TranscriptUsageTableFilters = initialTranscriptUsageFilters,
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
  state: GeneBrowserFilters = initialGeneBrowserFilters,
  action: SetGeneBrowserFiltersAction
) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_FILTERS:
      return { ...action.payload };
    default:
      return state;
  }
};

const geneBrowserTranscriptsData = (
  state: TranscriptsData = { minimumPosition: 0, maximumPosition: 0, transcripts: [] },
  action: SetGeneBrowserTranscriptsData | SortGeneBrowserTranscripts
) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_TRANSCRIPTS_DATA:
      return { ...action.payload };
    case ACTION.SORT_GENE_BROWSER_TRANSCRIPTS:
      const sortedTranscripts = state.transcripts.sort((x, y) => {
        const yMeans = y.conditions.find((e) => e.condition === action.payload)?.mean || 0;
        const xMeans = x.conditions.find((e) => e.condition === action.payload)?.mean || 0;

        return yMeans - xMeans;
      });

      return { ...state, transcripts: sortedTranscripts };
    default:
      return state;
  }
};

const geneBrowserScrollPosition = (state = 0, action: SetGeneBrowserScrollPosition) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_SCROLL_POSITION:
      return action.payload;
    default:
      return state;
  }
};

const geneBrowserMouseoverPosition = (state = -1, action: SetGeneBrowserMouseoverPosition) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_MOUSEOVER_POSITION:
      return action.payload;
    default:
      return state;
  }
};

const geneBrowserScrollJumpPosition = (
  state = { pos: 0, fromTables: false },
  action: SetGeneBrowserScrollJumpPosition
) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_SCROLL_JUMP_POSITION:
      return action.payload;
    default:
      return state;
  }
};

const geneBrowserTranscriptVisibility = (
  state: { transcriptId: string; isVisible: boolean }[] = [],
  action: SetGeneBrowserTranscriptVisibility | ClearGeneBrowserTranscriptVisibility
) => {
  switch (action.type) {
    case ACTION.CLEAR_GENE_BROWSER_TRANSCRIPT_VISIBILITY:
      return [];
    case ACTION.SET_GENE_BROWSER_TRANSCRIPT_VISIBILITY:
      return uniqBy([...action.payload, ...state], 'transcriptId');
    default:
      return state;
  }
};

const geneBrowserBoxHeight = (state = 20, action: SetGeneBrowserBoxHeight) => {
  switch (action.type) {
    case ACTION.SET_GENE_BROWSER_BOX_HEIGHT:
      return action.payload;
    default:
      return state;
  }
};

const geneBrowserVirtualRefs = (
  state: { id: string; ref: FixedSizeList }[] = [],
  action: AddGeneBrowserVirtualRef | RemoveGeneBrowserVirtualRefsForTranscript
) => {
  switch (action.type) {
    case ACTION.ADD_GENE_BROWSER_VIRTUAL_REF:
      return uniqBy([...state, action.payload], 'id');
    case ACTION.REMOVE_GENE_BROWSER_VIRTUAL_REFS_FOR_TRANSCRIPT:
      return state.filter(({ id }) => !id.startsWith(action.payload));
    default:
      return state;
  }
};

export default combineReducers({
  conditionTypes,
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
  geneBrowserTranscriptsData,
  geneBrowserScrollPosition,
  geneBrowserMouseoverPosition,
  geneBrowserScrollJumpPosition,
  geneBrowserTranscriptVisibility,
  geneBrowserBoxHeight,
  geneBrowserVirtualRefs,
});
