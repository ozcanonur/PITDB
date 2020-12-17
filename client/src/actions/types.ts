export enum ACTION {
  UPDATE_BROWSE_PROJECT_CONTROL,
}

export type UpdateBrowseProjectControl = {
  type: ACTION.UPDATE_BROWSE_PROJECT_CONTROL;
  payload: {
    controlName: string;
  };
};
