import { MutationTableFilters } from 'components/Project/Mutations/types';
import { DGETableFilters } from 'components/Project/DGE/types';
import { SplicingEventsTableFilters } from 'components/Project/SplicingEvents/types';
import { TranscriptUsageTableFilters } from 'components/Project/TranscriptUsage/types';

export enum ACTION {
  SET_MUTATION_FILTERS,
  SELECT_MUTATION,
  SET_DGE_FILTERS,
  SELECT_DGE,
  SET_SPLICING_EVENTS_FILTERS,
  SELECT_SPLICING_EVENT,
  SET_TRANSCRIPT_USAGE_FILTERS,
  SELECT_TRANSCRIPT_USAGE,
  SELECT_TRANSCRIPT_VIEWER_TRANSCRIPT,
}
export type SelectMutationAction = {
  type: ACTION.SELECT_MUTATION;
  payload: {
    gene: string;
    position: string;
  };
};

export type SelectDGEAction = {
  type: ACTION.SELECT_DGE;
  payload: {
    symbol: string;
  };
};

export type SetMutationFiltersAction = {
  type: ACTION.SET_MUTATION_FILTERS;
  payload: MutationTableFilters;
};

export type SetDGEFiltersAction = {
  type: ACTION.SET_DGE_FILTERS;
  payload: DGETableFilters;
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
