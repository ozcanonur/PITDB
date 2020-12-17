import { useState, useEffect } from 'react';

import { CheckboxProps } from './types';
import { useStyles } from './styles/checkbox';

const Checkbox = ({ label, parentLabel, onChange, iconProps, labelProps, className, ...props }: CheckboxProps) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (parentLabel) onChange(checked, label, parentLabel);
    else onChange(checked, label);
  }, [label, parentLabel, checked, onChange]);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const iconClassName =
    iconProps && iconProps.className ? `${classes.checkboxIcon} ${iconProps.className}` : classes.checkboxIcon;
  const labelClassName =
    labelProps && labelProps.className ? `${classes.checkboxLabel} ${labelProps.className}` : classes.checkboxLabel;

  return (
    <div
      className={`${classes.checkboxContainer} ${className}`}
      style={{ backgroundColor: checked ? 'rgba(28, 27, 126, 0.1)' : 'transparent' }}
      onClick={toggleCheckbox}
      {...props}
    >
      <div className={iconClassName} style={{ backgroundColor: checked ? '#333366' : 'transparent' }} />
      <div className={labelClassName}>{label}</div>
    </div>
  );
};

export default Checkbox;
