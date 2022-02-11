import { type } from 'os';
import React from 'react';
import './crossUpDate.scss';
import { AppProperties } from '../../../interfaces/appProperties';


type CrossUpDateType = {
  crossId: string;  
}

class CrossUpDate extends React.Component<CrossUpDateType> {
  // constructor(props: CrossUpDateType) {
  //   super(props);
  // }

  render() {
    return (
      <div
        className='cross'
      id={ this.props.crossId }>
        <div className='cross__line-1'></div>
        <div className='cross__line-2'></div>
      </div>
    );
  }
}

export { CrossUpDate };