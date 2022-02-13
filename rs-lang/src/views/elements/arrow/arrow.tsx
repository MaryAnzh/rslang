import React from 'react';
import { ReactDOM } from 'react';
import './arrow.scss';
import { startPageModel } from '../../../model/StartPageModel';

type ArrowProps = {
  arrowClass: string;
  openSection: Function;
}



class Arrow extends React.Component<ArrowProps> {

  render() {
    // let class = 'left-arrow' + 
    return (
      <div
        className={this.props.arrowClass}
      onClick= {(e) => {this.openSectionOnClick(e)} }>
        <div className='left-arrow__top'></div>
        <div className='left-arrow__bottom'></div>
      </div>
    );
  }
  
  openSectionOnClick(e: React.MouseEvent<HTMLElement>) {
    this.props.openSection();
  }
}

export { Arrow };