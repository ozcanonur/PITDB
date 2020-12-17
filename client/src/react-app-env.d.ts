/// <reference types="react-scripts" />

interface BrowseProjectControl {
  'Mutations table': Boolean;
  'Sample quality': Boolean;
  'Allele frequency': Boolean;
  'Variant distribution': Boolean;
}

interface RootState {
  browseProjectControl: BrowseProjectControl;
}

interface SelectOption {
  value: string;
  label: string;
}

interface GenericObject {
  [key: string]: any;
}
