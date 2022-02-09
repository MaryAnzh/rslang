import React from 'react';
import './CardButtons.scss';
import playPic from '../../../img/svg/play.svg';
import pausePic from '../../../img/svg/pause.svg';
import addPic from '../../../img/svg/add.svg';
import applyPic from '../../../img/svg/check.svg';
import { CardButtonsState } from '../../../interfaces/types';


class CardButtons extends React.Component {
  state: CardButtonsState;

  constructor(props: {}) {
    super(props);
    this.state = {
      isPlay: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prev: CardButtonsState) => ({
      isPlay: !prev.isPlay,
    }));
  }

  render() {
    return (
      <div className="card-buttons">
        <button className="card-buttons__btn-sound card-buttons__btn">
          <img onClick={this.handleClick} src={this.state.isPlay ? pausePic : playPic} alt="sound" className="card-buttons__pic"/>
        </button>
        <button className="card-buttons__btn-sound card-buttons__btn">
          <img src={addPic} alt="add" className="card-buttons__pic"/>
        </button>
        <button className="card-buttons__btn-sound card-buttons__btn">
          <img src={applyPic} alt="apply" className="card-buttons__pic"/>
        </button>
      </div>
    );
  }
}

export { CardButtons };