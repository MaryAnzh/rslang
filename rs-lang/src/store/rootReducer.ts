import { combineReducers } from 'redux'; 
import { buttonsReducer } from './reducers/buttonsReducer';

export const rootReducer = combineReducers({
  glob: buttonsReducer,
});