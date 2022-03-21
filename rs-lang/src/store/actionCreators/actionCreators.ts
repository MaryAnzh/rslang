import { CHANGE_EASY, CHANGE_HARDS, UPDATE, UPDATE_LINK } from '../actions/actions'

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

export function updateLink(value: boolean) {
  return { 
    type: UPDATE_LINK,
    value: value,
  };
}
