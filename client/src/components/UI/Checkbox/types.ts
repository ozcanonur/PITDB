export interface CheckboxProps {
  label: string;
  parentLabel?: string;
  onChange: (checked: boolean, label: string, parentLabel?: string) => void;
  iconProps?: any;
  labelProps?: any;
  className?: string;
}
