/// <reference types="react-scripts" />

interface GenericObject {
  [key: string]: any;
}

interface RootState {
  conditionTypes: string[];
  mutationFilters: import('components/Project/Mutations/Table/types').MutationTableFilters;
  selectedMutation: {
    gene: string;
    position: string;
  };
  DGEFilters: import('components/Project/DGE/Table/types').DGETableFilters;
  selectedDGE: {
    symbol: string;
  };
  splicingEventsFilters: import('components/Project/SplicingEvents/Table/types').SplicingEventsTableFilters;
  selectedSplicingEvent: {
    gene: string;
    dPSI: number;
  };
  transcriptUsageFilters: import('components/Project/SplicingEvents/Table/types').SplicingEventsTableFilters;
  selectedTranscriptUsage: {
    gene: string;
    transcript: string;
  };
  selectedTranscriptViewerTranscript: {
    transcript: string;
  };
  selectedTranscriptViewerTranscriptColor: {
    color: string;
  };
  geneBrowserFilters: import('components/Project/GeneBrowser/types').GeneBrowserFilters;
  geneBrowserTranscriptsData: import('components/Project/GeneBrowser/types').TranscriptsData;
  geneBrowserScrollPosition: number;
  geneBrowserScrollJumpPosition: { pos: number; fromTables: boolean };
  geneBrowserMouseoverPosition: number;
  geneBrowserTranscriptVisibility: { transcriptId: string; isVisible: boolean }[];
  geneBrowserBoxHeight: number;
  geneBrowserVirtualRefs: { id: string; ref: import('react-window').FixedSizeList }[];
}
