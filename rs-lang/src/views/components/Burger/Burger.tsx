import React from 'react';
import './Burger.scss';
import { applicationModel } from '../../../model/ApplicationModel';

type BurgerType = {
  burgerUp: Function;
}

class Burger extends React.Component<BurgerType> {

  render() {
    return (
      <div className='burger-wrap'
        onClick={(e) => { this.burgerOnClick(e) }}
      >
        <div className='burger-wrap__burger'

        >
          <div className='burger-wrap__burger__line'></div>
          <div className='burger-wrap__burger__line'></div>
          <div className='burger-wrap__burger__line'></div>
        </div>
        <nav className='burger-wrap__nav'>

        </nav>
      </div>
    );
  }

  burgerOnClick(e: React.MouseEvent<HTMLElement>) {
    if (applicationModel.isBurgerOpen) {
      this.props.burgerUp('none');
      applicationModel.isBurgerOpen = false;
    } else {
      this.props.burgerUp('flex');
      applicationModel.isBurgerOpen = true;

    }

  }
}

export { Burger };