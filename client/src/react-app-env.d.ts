/// <reference types="react-scripts" />

interface RootState {
  browseFilterOptions: BrowseFilterOption[];
}

interface MultiSelectOption {
  value: string;
  label: string;
}

interface BrowseFilterOptions {
  [filterName: string]: string[];
}
