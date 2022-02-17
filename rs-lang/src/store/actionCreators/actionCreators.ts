import { UPDATE } from '../actions/actions'

export function updateAction(value: boolean) {
  // console.log('updateAction value: ' + value);
  return { 
    type: UPDATE,
    value: value,
  };
}
