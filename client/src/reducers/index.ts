import { combineReducers } from 'redux';
import { ACTION, SelectMutationAction } from 'actions/types';

const selectedMutation = (
  state: { gene: string; position: string } = { gene: '', position: '' },
  action: SelectMutationAction
) => {
  switch (action.type) {
    case ACTION.SELECT_MUTATION:
      const { gene, position } = action.payload;
      return { gene, position };
    default:
      return state;
  }
};

export default combineReducers({
  selectedMutation,
});
