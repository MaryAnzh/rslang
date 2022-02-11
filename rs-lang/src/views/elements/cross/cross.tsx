import React from 'react';
import './cross.scss';
import { startPageModel } from '../../../model/StartPageModel';

class Cross extends React.Component {

  render() {
    return (
      <div
        id='cross'
        className='cross'
        onClick={(e) => startPageModel.closeSignInOnClick(e)}>
        <div className='cross__line-1'></div>
        <div className='cross__line-2'></div>
      </div>
    );
  }
}

export { Cross };