import React from 'react';
import './cross.scss';
import { startPageModule } from '../../../module/startPageModule';
//import { render } from '@testing-library/react';

class Cross extends React.Component {

  render() {
    return (
      <div className='cross' onClick={(e) => startPageModule.closeSignInOnClick(e)}>
        <div className='cross__line-1'></div>
        <div className='cross__line-2'></div>
      </div>
    );
  }
}

export { Cross };