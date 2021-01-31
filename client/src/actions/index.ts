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
  SetGeneBrowserBoxHeight,
  SetGeneBrowserScrollPosition,
  SetGeneBrowserScrollJumpPosition,
} from './types';
import { MutationTableFilters } from 'components/Project/Mutations/Table/types';
import { DGETableFilters } from 'components/Project/DGE/Table/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/Table/types';
import { TranscriptUsageTableFilters } from 'components/Project/TranscriptUsage/Table/types';
import { GeneBrowserFilters } from 'components/Project/GeneBrowser/types';

export const setConditionTypes = (conditionTypes: string[]): SetConditionTypes => ({
  type: ACTION.SET_CONDITION_TYPES,
  payload: conditionTypes,
});

export const setMutationFilters = (filters: MutationTableFilters): SetMutationFiltersAction => ({
  type: ACTION.SET_MUTATION_FILTERS,
  payload: filters,
});

export const selectMutation = (gene: string, position: string): SelectMutationAction => ({
  type: ACTION.SELECT_MUTATION,
  payload: {
    gene,
    position,
  },
});

export const setDGEFilters = (filters: DGETableFilters): SetDGEFiltersAction => ({
  type: ACTION.SET_DGE_FILTERS,
  payload: filters,
});

export const selectDGE = (symbol: string): SelectDGEAction => ({
  type: ACTION.SELECT_DGE,
  payload: {
    symbol,
  },
});

export const setSplicingEventsFilters = (
  filters: SplicingEventsTableFilters
): SetSplicingEventsFiltersAction => ({
  type: ACTION.SET_SPLICING_EVENTS_FILTERS,
  payload: filters,
});

export const selectSplicingEvent = (gene: string, dPSI: number): SelectSplicingEventAction => ({
  type: ACTION.SELECT_SPLICING_EVENT,
  payload: {
    gene,
    dPSI,
  },
});

export const setTranscriptUsageFilters = (
  filters: TranscriptUsageTableFilters
): SetTranscriptUsageFiltersAction => ({
  type: ACTION.SET_TRANSCRIPT_USAGE_FILTERS,
  payload: filters,
});

export const selectTranscriptUsage = (gene: string, transcript: string): SelectTranscriptUsageAction => ({
  type: ACTION.SELECT_TRANSCRIPT_USAGE,
  payload: {
    gene,
    transcript,
  },
});

export const selectTranscriptViewerTranscript = (
  transcript: string
): SelectTranscriptViewerTranscriptAction => ({
  type: ACTION.SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT,
  payload: {
    transcript,
  },
});

export const selectTranscriptViewerTranscriptColor = (
  color: string
): SelectTranscriptViewerTranscriptColorAction => ({
  type: ACTION.SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT_COLOR,
  payload: {
    color,
  },
});

export const setGeneBrowserFilters = (filters: GeneBrowserFilters): SetGeneBrowserFiltersAction => ({
  type: ACTION.SET_GENE_BROWSER_FILTERS,
  payload: filters,
});

export const setGeneBrowserBoxHeight = (boxHeight: number): SetGeneBrowserBoxHeight => ({
  type: ACTION.SET_GENE_BROWSER_BOX_HEIGHT,
  payload: {
    boxHeight,
  },
});

export const setGeneBrowserScrollPosition = (scrollPosition: number): SetGeneBrowserScrollPosition => ({
  type: ACTION.SET_GENE_BROWSER_SCROLL_POSITION,
  payload: scrollPosition,
});

export const setGeneBrowserScrollJumpPosition = (
  scrollPosition: number
): SetGeneBrowserScrollJumpPosition => ({
  type: ACTION.SET_GENE_BROWSER_SCROLL_JUMP_POSITION,
  payload: {
    scrollPosition,
  },
});
