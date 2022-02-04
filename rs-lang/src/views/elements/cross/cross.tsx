import React from 'react';
import './cross.scss';
//import { render } from '@testing-library/react';

class Cross extends React.Component {

  render() {
    return (
      <div className='cross' onClick={(e) => this.closeSignInOnClick(e)}>
        <div className='cross__line-1'></div>
        <div className='cross__line-2'></div>
      </div>
    );
  }

  closeSignInOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {    
    const signIn = document.getElementById('register');
    if (signIn !== null) {
      signIn.style.display = 'none';
    }
  }
}

export { Cross };