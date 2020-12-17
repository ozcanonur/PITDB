import { ACTION, UpdateBrowseProjectControl } from './types';

export const updateBrowseProjectControl = (controlName: string): UpdateBrowseProjectControl => {
  return {
    type: ACTION.UPDATE_BROWSE_PROJECT_CONTROL,
    payload: {
      controlName,
    },
  };
};
