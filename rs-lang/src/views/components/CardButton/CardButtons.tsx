import React from 'react';
import './CardButtons.scss';
import playPic from '../../../img/svg/play.svg';
import pausePic from '../../../img/svg/pause.svg';
import addPic from '../../../img/svg/add.svg';
import applyPic from '../../../img/svg/check.svg';
import { ButtonsGlobState, CardButtonsProps, CardButtonsState } from '../../../interfaces/types';
import { soundModel } from '../../../model/SoundModel';
import { connect } from 'react-redux';
import { newDataService } from '../../../dataServer/dataService';


const wordEx = { difficulty: 'hard', optional: {} };

const mapStateToProps = (state: ButtonsGlobState, ownProps: CardButtonsProps ) => {
  return {
    soundUrls: ownProps.soundUrls,
    isAutorize: state.buttons.isAutorize,
  }
};

const connector = connect(mapStateToProps, null);

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
    // console.log('PROPS ' + JSON.stringify(this.props));
    return (
      <div className="card-buttons">
        <button onClick={this.handleClick} className={this.props.isAutorize ? 'card-buttons__btn' : 'card-buttons__btn card-buttons__btn-fix'}>
          <img  src={this.state.isPlay ? pausePic : playPic} alt="sound" className="card-buttons__pic"/>
        </button>
        <button onClick={() => newDataService.addHardWord(this.props.wordId, wordEx)} className={this.props.isAutorize ? 'card-buttons__btn' : 'card-buttons__btn card-buttons__btn-disable'}>
          <img src={addPic} alt="add" className="card-buttons__pic"/>
        </button>
        <button className={this.props.isAutorize ? 'card-buttons__btn' : 'card-buttons__btn card-buttons__btn-disable'}>
          <img src={applyPic} alt="apply" className="card-buttons__pic"/>
        </button>
      </div>
    );
  }
}



const CARD_BUTTONS_W = connector(CardButtons);
export default CARD_BUTTONS_W;

// export { CardButtons };