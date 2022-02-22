import React from 'react';
import './CardButtons.scss';
import playPic from '../../../img/svg/play.svg';
import pausePic from '../../../img/svg/pause.svg';
import addPic from '../../../img/svg/add.svg';
import applyPic from '../../../img/svg/check.svg';
import applyPicGreen from '../../../img/svg/check_green.svg';
import delPic from '../../../img/svg/delete.svg';
import trending from '../../../img/svg/trending.svg';
import { ButtonsGlobState, CardButtonsProps, CardButtonsState } from '../../../interfaces/types';
import { soundModel } from '../../../model/SoundModel';
import { connect } from 'react-redux';
import { changeHardsAction } from '../../../store/actionCreators/actionCreators';
import { userStorage } from '../../../model/UserStorage';
import { ProgressPopup } from '../ProgressPopup/ProgressPopup';


const mapStateToProps = (state: ButtonsGlobState, ownProps: CardButtonsProps ) => {
  return {
    soundUrls: ownProps.soundUrls,
    isAutorize: state.glob.isAutorize,
    hardsArray: state.glob.hardsArray,
    easyArray: state.glob.easyArray,
  }
};

const mapDispatchToProps = {
  changeHardsAction,
};

type ArrayActionProps = {
  changeHardsAction: Function,
  hardsArray: string[],
  easyArray: string[],
}

const connector = connect(mapStateToProps, mapDispatchToProps);

class CardButtons extends React.Component<CardButtonsProps & ArrayActionProps> {
  state: CardButtonsState;

  constructor(props: CardButtonsProps & ArrayActionProps) {
    super(props);
    this.state = {
      isPlay: false,
      isShowPopup: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.addWordHandler = this.addWordHandler.bind(this);
    this.delWordHandler = this.delWordHandler.bind(this);
    this.addEasyHandler = this.addEasyHandler.bind(this);
    this.delEasyHandler = this.delEasyHandler.bind(this);
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

  async addWordHandler() {
    userStorage.addHardWord(this.props.wordId);
  }

  
  async delWordHandler() {
    userStorage.delHardWord(this.props.wordId);
  }
  
  async addEasyHandler() {
    userStorage.addEasyWord(this.props.wordId);
  }

  async delEasyHandler() {
    userStorage.delEasyWord(this.props.wordId);
  }

  togglePopup() {
    this.setState((prev: CardButtonsState) => ({
      isShowPopup: !prev.isShowPopup,
    }));
  }

  render() {
    let hardBtn: JSX.Element | null = null;
    let easyBtn: JSX.Element | null = null;

    if (!this.props.easyArray.includes(this.props.wordId)) {
      easyBtn = (
        <button onClick={this.addEasyHandler} className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__apply' : 'card-buttons__btn card-buttons__btn-disable'}>
          <img src={applyPic} alt="apply" className="card-buttons__pic"/>
        </button>
      );
      if (!this.props.hardsArray.includes(this.props.wordId)) {
        hardBtn = (
            <button onClick={this.addWordHandler} className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__add' : 'card-buttons__btn card-buttons__btn-disable'}>
              <img src={addPic} alt="add" className="card-buttons__pic"/>
            </button>
        );
      } else {
        hardBtn = (
            <button onClick={this.delWordHandler} className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__del' : 'card-buttons__btn card-buttons__btn-disable'}>
              <img src={delPic} alt="del" className="card-buttons__pic"/>
            </button>
        );
      }
    } else {
      easyBtn = (
        <button onClick={this.delEasyHandler} className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__del-easy' : 'card-buttons__btn card-buttons__btn-disable'}>
          <img src={applyPicGreen} alt="apply" className="card-buttons__pic"/>
        </button>
      );
    }
    return (
      <div className="card-buttons">
        <button onClick={this.handleClick} className={this.props.isAutorize ? 'card-buttons__btn  tooltip tooltip__sound' : 'card-buttons__btn tooltip tooltip__sound card-buttons__btn-fix'}>
          <img  src={this.state.isPlay ? pausePic : playPic} alt="sound" className="card-buttons__pic"/>
        </button>
        <button onClick={this.togglePopup.bind(this)} className={this.props.isAutorize ? 'card-buttons__btn  tooltip tooltip__statistics' : 'card-buttons__btn card-buttons__btn-disable'}>
          <img  src={trending} alt="sound" className="card-buttons__pic"/>
        </button>
        {hardBtn}
        {this.state.isShowPopup && <ProgressPopup />}
        {easyBtn}
      </div>
    );
  }
}



const CARD_BUTTONS_W = connector(CardButtons);
export default CARD_BUTTONS_W;