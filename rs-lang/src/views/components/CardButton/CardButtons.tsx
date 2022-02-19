import React from 'react';
import './CardButtons.scss';
import playPic from '../../../img/svg/play.svg';
import pausePic from '../../../img/svg/pause.svg';
import addPic from '../../../img/svg/add.svg';
import applyPic from '../../../img/svg/check.svg';
import delPic from '../../../img/svg/delete.svg';
import { ButtonsGlobState, CardButtonsProps, CardButtonsState } from '../../../interfaces/types';
import { soundModel } from '../../../model/SoundModel';
import { connect } from 'react-redux';
import { newDataService } from '../../../dataServer/dataService';
import { changeHardsAction } from '../../../store/actionCreators/actionCreators';


const wordEx = { difficulty: 'hard', optional: {} };

const mapStateToProps = (state: ButtonsGlobState, ownProps: CardButtonsProps ) => {
  return {
    soundUrls: ownProps.soundUrls,
    isAutorize: state.glob.isAutorize,
    hardsArray: state.glob.hardsArray,
  }
};

const mapDispatchToProps = {
  changeHardsAction,
};

type ArrayActionProps = {
  changeHardsAction: Function,
  hardsArray: string[],
}

const connector = connect(mapStateToProps, mapDispatchToProps);

class CardButtons extends React.Component<CardButtonsProps & ArrayActionProps> {
  state: CardButtonsState;

  constructor(props: CardButtonsProps & ArrayActionProps) {
    super(props);
    this.state = {
      isPlay: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.addWordHandler = this.addWordHandler.bind(this);
    this.delWordHandler = this.delWordHandler.bind(this);
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
    await newDataService.addHardWord(this.props.wordId, wordEx);
    // console.log('addWordHandler');
    const list = await newDataService.getHardWordsAsList();
    await this.props.changeHardsAction(list);
  }

  async delWordHandler() {
    await newDataService.deleteHardWord(this.props.wordId);
    console.log('deleteWordHandler');
    const list = await newDataService.getHardWordsAsList();
    await this.props.changeHardsAction(list);
  }

  render() {
    // console.log('PROPS ' + JSON.stringify(this.props));
    let addBtn: JSX.Element | null;
    if (!this.props.hardsArray.includes(this.props.wordId)) {
      addBtn = (
          <button onClick={this.addWordHandler} className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__add' : 'card-buttons__btn card-buttons__btn-disable'}>
            <img src={addPic} alt="add" className="card-buttons__pic"/>
          </button>
      );
    } else {
      addBtn = (
          <button onClick={this.delWordHandler} className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__del' : 'card-buttons__btn card-buttons__btn-disable'}>
            <img src={delPic} alt="del" className="card-buttons__pic"/>
          </button>
      );
    }
    return (
      <div className="card-buttons">
        <button onClick={this.handleClick} className={this.props.isAutorize ? 'card-buttons__btn' : 'card-buttons__btn card-buttons__btn-fix'}>
          <img  src={this.state.isPlay ? pausePic : playPic} alt="sound" className="card-buttons__pic"/>
        </button>
        {addBtn}
        <button className={this.props.isAutorize ? 'card-buttons__btn tooltip tooltip__apply' : 'card-buttons__btn card-buttons__btn-disable'}>
          <img src={applyPic} alt="apply" className="card-buttons__pic"/>
        </button>
      </div>
    );
  }
}



const CARD_BUTTONS_W = connector(CardButtons);
export default CARD_BUTTONS_W;