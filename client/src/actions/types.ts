export enum ACTION {
  SELECT_MUTATION,
}
export type SelectMutationAction = {
  type: ACTION.SELECT_MUTATION;
  payload: {
    gene: string;
    position: string;
  };
};
