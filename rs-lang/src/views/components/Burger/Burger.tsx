import React from 'react';
import './Burger.scss';

type BurgerType = {

}

class Burger extends React.Component {
  render() {
    return (
      <div className='burger-wrap'>
        <div className='burger-wrap__burger'>
          <div className='burger-wrap__burger__line'></div>
          <div className='burger-wrap__burger__line'></div>
          <div className='burger-wrap__burger__line'></div>
        </div>
        <nav className='burger-wrap__nav'>
          
        </nav>
      </div>
    );
  }
}

export { Burger };