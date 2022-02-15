import React from 'react';
import arrowForward from '../../../img/svg/arrow_forward.svg';
import './GameLinks.scss';

class GamesLinks extends React.Component {
  render() {
    return (
      <div className='game-links'>
        <p className='game-links__text'>Игры</p>
        <button className='game-links__btn'>
          <img className='game-links__img' src={arrowForward} alt="back" />
        </button>
      </div>
    );
  }
}

export default GamesLinks;