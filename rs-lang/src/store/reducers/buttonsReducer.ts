import { ActionType } from '../../interfaces/types';
import { CHANGE_EASY, CHANGE_HARDS, UPDATE, UPDATE_LINK } from '../actions/actions';

const initialState = {
  isAutorize: false,
  isGameLink: false,
  hardsArray: [],
  easyArray: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const buttonsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, isAutorize: action.value }
    case CHANGE_HARDS:
      return { ...state, hardsArray: action.value }
    case CHANGE_EASY:
      return { ...state, easyArray: action.value }
    case UPDATE_LINK:
      return { ...state, isGameLink: action.value }
    default:
      return state;
  }
};