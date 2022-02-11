import React from 'react';
import './CardButtons.scss';
import playPic from '../../../img/svg/play.svg';
import pausePic from '../../../img/svg/pause.svg';
import addPic from '../../../img/svg/add.svg';
import applyPic from '../../../img/svg/check.svg';
import { CardButtonsProps, CardButtonsState } from '../../../interfaces/types';
import { soundModel } from '../../../model/SoundModel';


class CardButtons extends React.Component<CardButtonsProps> {
  state: CardButtonsState;

  constructor(props: CardButtonsProps) {
    super(props);
    this.state = {
      isPlay: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    if (!soundModel.isPlay) {
      this.setState((prev: CardButtonsState) => ({
        isPlay: !prev.isPlay,
      }));
      await soundModel.play(this.props.soundUrls);
      this.setState((prev: CardButtonsState) => ({
        isPlay: !prev.isPlay,
      }));
    } else {
      if (this.state.isPlay) {
        this.setState((prev: CardButtonsState) => ({
          isPlay: !prev.isPlay,
        }));
        soundModel.stop();
      }
    }
  }

  render() {
    return (
      <div className="card-buttons">
        <button onClick={this.handleClick} className="card-buttons__btn-sound card-buttons__btn">
          <img  src={this.state.isPlay ? pausePic : playPic} alt="sound" className="card-buttons__pic"/>
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