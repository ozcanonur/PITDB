import React from 'react';
import { useDispatch } from 'react-redux';

import { projectSidebarControls } from 'variables/projectSidebarControls';
import Checkbox from 'components/UI/Checkbox/Checkbox';

import { useStyles } from './styles/control';
import { updateBrowseProjectControl } from 'actions/index';

const Control = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onChange = (checked: boolean, label: string, parentLabel?: string) => {
    // console.log(label, parentLabel, checked);
    dispatch(updateBrowseProjectControl(label));
  };

  return (
    <div className={classes.controlContainer}>
      <div className={classes.controlItems}>
        {projectSidebarControls.map(({ category, items }) => (
          <React.Fragment key={category}>
            <div className={classes.category}>
              <Checkbox label={category} onChange={onChange} />
            </div>
            <div className={classes.items}>
              {items.map((item, key) => (
                <div key={key} className={classes.item}>
                  <Checkbox
                    label={item}
                    parentLabel={category}
                    onChange={onChange}
                    labelProps={{ className: classes.item }}
                    iconProps={{ className: classes.icon }}
                  />
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Control;
