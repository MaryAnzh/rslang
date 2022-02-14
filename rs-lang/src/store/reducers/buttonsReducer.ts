import { ActionType } from '../../interfaces/types';
import { UPDATE } from '../actions/actions';
// import { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAutorize: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const buttonsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, isAutorize: action.value }
    default:
      return state;
  }
};