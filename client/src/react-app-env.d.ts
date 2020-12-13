/// <reference types="react-scripts" />

interface RootState {
  browseFilterOptions: BrowseFilterOption[];
}

interface SelectOption {
  value: string;
  label: string;
}

interface BrowseFilterOptions {
  [filterName: string]: string[];
}

interface GenericObject {
  [key: string]: any;
}
