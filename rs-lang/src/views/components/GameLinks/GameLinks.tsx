import React from 'react';
import { Link } from 'react-router-dom';
import arrowForward from '../../../img/svg/arrow_forward.svg';
import { applicationModel } from '../../../model/ApplicationModel';
import './GameLinks.scss';

class GamesLinks extends React.Component {
  state: { 
    open: boolean, 
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    let links: JSX.Element | null;
    if (this.state.open) {
      links = (
        <div className='game-links__links'>
          <li className='game-links__link-wrapper'>
            <Link onClick={() => applicationModel.gameFromBook = true} to="/audiocall-game" className="game-links__link">Аудиовызов</Link>
          </li>
          <li className='game-links__link-wrapper'>
            <Link onClick={() => applicationModel.gameFromBook = true} to="/sprint-game" className="game-links__link">Спринт</Link>
          </li>
        </div>
      );
    } else {
      links = null;
    }
    return (
      <div className='game-links'>
        <p className='game-links__text'>Игры</p>
        <button className='game-links__btn' onClick={() => {this.setState({ open: !this.state.open })}}>
          <img className='game-links__img' src={arrowForward} alt="back" />
        </button>
        {links}
      </div>
    );
  }
}

export default GamesLinks;