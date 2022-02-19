import { ActionType } from '../../interfaces/types';
import { CHANGE_HARDS, UPDATE } from '../actions/actions';

const initialState = {
  isAutorize: false,
  hardsArray: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const buttonsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, isAutorize: action.value }
    case CHANGE_HARDS:
      return { ...state, hardsArray: action.value }
    default:
      return state;
  }
};