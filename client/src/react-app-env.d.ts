/// <reference types="react-scripts" />

interface RootState {
  mutationFilters: import('components/Project/Mutations/types').MutationTableFilters;
  selectedMutation: {
    gene: string;
    position: string;
  };
  DGEFilters: import('components/Project/DGE/types').DGETableFilters;
  selectedDGE: {
    symbol: string;
  };
  splicingEventsFilters: import('components/Project/SplicingEvents/types').SplicingEventsTableFilters;
  selectedSplicingEvent: {
    gene: string;
    dPSI: number;
  };
  transcriptUsageFilters: import('components/Project/SplicingEvents/types').SplicingEventsTableFilters;
  selectedTranscriptUsage: {
    gene: string;
    transcript: string;
  };
}

interface SelectOption {
  value: string;
  label: string;
}

interface GenericObject {
  [key: string]: any;
}
