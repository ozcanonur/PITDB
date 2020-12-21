/// <reference types="react-scripts" />

interface RootState {
  selectedMutation: {
    gene: string;
    position: string;
  };
  mutationFilters: import('components/Project/Mutations/types').MutationTableFilters;
}

interface SelectOption {
  value: string;
  label: string;
}

interface GenericObject {
  [key: string]: any;
}
