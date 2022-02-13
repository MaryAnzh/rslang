import React from 'react';
import { ReactDOM } from 'react';
import './arrow.scss';
import { startPageModel } from '../../../model/StartPageModel';

type ArrowProps = {
  arrowClass: string;
}



class Arrow extends React.Component<ArrowProps> {

  render() {
    // let class = 'left-arrow' + 
    return (
      <div
        className={this.props.arrowClass}>
        <div className='left-arrow__top'></div>
        <div className='left-arrow__bottom'></div>
      </div>
    );
  }
}

export { Arrow };