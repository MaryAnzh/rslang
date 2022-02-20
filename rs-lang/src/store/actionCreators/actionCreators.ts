import { CHANGE_EASY, CHANGE_HARDS, UPDATE } from '../actions/actions'

export function updateAction(value: boolean) {
  // console.log('updateAction value: ' + value);
  return { 
    type: UPDATE,
    value: value,
  };
}

export function changeHardsAction(array: string[]) {
  return { 
    type: CHANGE_HARDS,
    value: array,
  };
}

export function changeEasyAction(array: string[]) {
  return { 
    type: CHANGE_EASY,
    value: array,
  };
}
