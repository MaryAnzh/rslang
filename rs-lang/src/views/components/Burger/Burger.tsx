import React from 'react';
import './Burger.scss';

type BurgerType = {
  burgerUp: Function;
}

class Burger extends React.Component<BurgerType> {
  isBergerOpen = false;

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

  async burgerOnClick(e: React.MouseEvent<HTMLElement>) {
    if (this.isBergerOpen) {
      await this.props.burgerUp('none');
      this.isBergerOpen = false;
    } else {
      await this.props.burgerUp('flex');
      this.isBergerOpen = true;

    }

  }
}

export { Burger };