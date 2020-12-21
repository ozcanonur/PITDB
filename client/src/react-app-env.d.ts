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
}

interface SelectOption {
  value: string;
  label: string;
}

interface GenericObject {
  [key: string]: any;
}
