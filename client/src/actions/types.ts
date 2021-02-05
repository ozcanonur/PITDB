import { MutationTableFilters } from 'components/Project/Mutations/Table/types';
import { DGETableFilters } from 'components/Project/DGE/Table/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/Table/types';
import { TranscriptUsageTableFilters } from 'components/Project/TranscriptUsage/Table/types';
import { GeneBrowserFilters } from 'components/Project/GeneBrowser/types';

export enum ACTION {
  SET_CONDITION_TYPES,
  SET_MUTATION_FILTERS,
  SELECT_MUTATION,
  SET_DGE_FILTERS,
  SELECT_DGE,
  SET_SPLICING_EVENTS_FILTERS,
  SELECT_SPLICING_EVENT,
  SET_TRANSCRIPT_USAGE_FILTERS,
  SELECT_TRANSCRIPT_USAGE,
  SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT,
  SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT_COLOR,
  SET_GENE_BROWSER_FILTERS,
  SELECT_GENE_BROWSER_GENE,
  SET_GENE_BROWSER_SCROLL_POSITION,
  SET_GENE_BROWSER_MOUSEOVER_POSITION,
  SET_GENE_BROWSER_SCROLL_JUMP_POSITION,
  SET_GENE_BROWSER_TRANSCRIPT_VISIBILITY,
  CLEAR_GENE_BROWSER_TRANSCRIPT_VISIBILITY,
  SET_GENE_BROWSER_BOX_HEIGHT,
}

export type SetConditionTypes = {
  type: ACTION.SET_CONDITION_TYPES;
  payload: string[];
};

export type SetMutationFiltersAction = {
  type: ACTION.SET_MUTATION_FILTERS;
  payload: MutationTableFilters;
};

export type SelectMutationAction = {
  type: ACTION.SELECT_MUTATION;
  payload: {
    gene: string;
    position: string;
  };
};

export type SetDGEFiltersAction = {
  type: ACTION.SET_DGE_FILTERS;
  payload: DGETableFilters;
};

export type SelectDGEAction = {
  type: ACTION.SELECT_DGE;
  payload: {
    symbol: string;
  };
};

export type SetSplicingEventsFiltersAction = {
  type: ACTION.SET_SPLICING_EVENTS_FILTERS;
  payload: SplicingEventsTableFilters;
};

export type SelectSplicingEventAction = {
  type: ACTION.SELECT_SPLICING_EVENT;
  payload: {
    gene: string;
    dPSI: number;
  };
};

export type SetTranscriptUsageFiltersAction = {
  type: ACTION.SET_TRANSCRIPT_USAGE_FILTERS;
  payload: TranscriptUsageTableFilters;
};

export type SelectTranscriptUsageAction = {
  type: ACTION.SELECT_TRANSCRIPT_USAGE;
  payload: {
    gene: string;
    transcript: string;
  };
};

export type SelectTranscriptViewerTranscriptAction = {
  type: ACTION.SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT;
  payload: {
    transcript: string;
  };
};

export type SelectTranscriptViewerTranscriptColorAction = {
  type: ACTION.SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT_COLOR;
  payload: {
    color: string;
  };
};

export type SetGeneBrowserFiltersAction = {
  type: ACTION.SET_GENE_BROWSER_FILTERS;
  payload: GeneBrowserFilters;
};

export type SetGeneBrowserScrollPosition = {
  type: ACTION.SET_GENE_BROWSER_SCROLL_POSITION;
  payload: number;
};

export type SetGeneBrowserScrollJumpPosition = {
  type: ACTION.SET_GENE_BROWSER_SCROLL_JUMP_POSITION;
  payload: {
    scrollPosition: number;
  };
};

export type SetGeneBrowserMouseoverPosition = {
  type: ACTION.SET_GENE_BROWSER_MOUSEOVER_POSITION;
  payload: number;
};

export type SetGeneBrowserTranscriptVisibility = {
  type: ACTION.SET_GENE_BROWSER_TRANSCRIPT_VISIBILITY;
  payload: {
    transcriptId: string;
    isVisible: boolean;
  }[];
};

export type ClearGeneBrowserTranscriptVisibility = {
  type: ACTION.CLEAR_GENE_BROWSER_TRANSCRIPT_VISIBILITY;
};

export type SetGeneBrowserBoxHeight = {
  type: ACTION.SET_GENE_BROWSER_BOX_HEIGHT;
  payload: number;
};
