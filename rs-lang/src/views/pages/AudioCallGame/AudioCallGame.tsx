import React, { ButtonHTMLAttributes } from 'react';
import './AudioCallGame.scss';
import '../../elements/settingPanel/settingPanel';
import { audioCallPageModel } from '../../../model/AudioCallPageModel';
import { CrossUpDate } from '../../elements/crossUpDate/crossUpDate';
import { HeardsError } from '../../audioCallElements/heardsErrior/heardsError';
import { BellSVG } from '../../audioCallElements/bell/bell';
import { GameButton } from '../../audioCallElements/gameButton/gameButton';
import { AudioCallGameModel } from '../../../model/audioCallGameModel';
import { IAnxwer } from '../../../interfaces/wordsInterface';
import { WordCardType } from '../../../interfaces/types';
import { applicationModel } from '../../../model/ApplicationModel';
import { type } from 'os';
import { Music } from '../../components/music/music';
import { GameInfo } from '../../audioCallElements/gameInfo/gameInfo';
import { Soundview } from '../../audioCallElements/soundView/soundview';

type AudioCallGameType = {
  isLoading: boolean,
  heardFill_1: string,
  heardFill_2: string,
  heardFill_3: string,
  heardFill_4: string,
  heardFill_5: string,
  heardStroke: string,
  currentLevel: string,
  currentLevelColor: { background: string },
  currentButtonText_1: string,
  currentButtonText_2: string,
  currentButtonText_3: string,
  currentButtonText_4: string,
  currentButtonActive_0: { background: string },
  currentButtonActive_1: { background: string },
  currentButtonActive_2: { background: string },
  currentButtonActive_3: { background: string },
  currentButClassName: string,
  currentRound: string,
  currentRoundNumber: string,
  roundAudio: string,
  roundImg: string,
  gameInfoStyle: { display: string },
  audioButtonText: string,
  audioButtonClassName: string,
}



type ButtonType = {
  datatype: string,
}

class AudioCallGame extends React.Component {
  state: AudioCallGameType;

  gameModel: AudioCallGameModel;

  wordsArray: WordCardType[] | undefined;

  roundWordsArray: IAnxwer[];

  roundAudio: HTMLAudioElement;

  audioButtonClass: string;

  constructor(props: {}) {
    super(props);
    this.wordsArray = [];
    this.gameModel = new AudioCallGameModel(this.wordsArray);
    this.roundWordsArray = [];
    this.audioButtonClass = 'games-page-wrap__game-wrap__audio-call__game__repeat__button games-page-wrap__game-wrap__audio-call__game__repeat';
    this.state = {
      isLoading: true,
      heardFill_1: '#C48026',
      heardFill_2: '#C48026',
      heardFill_3: '#C48026',
      heardFill_4: '#C48026',
      heardFill_5: '#C48026',
      heardStroke: '#A66200',
      currentLevel: 'Уровень сложности 1',
      currentLevelColor: { background: '#FFB140' },
      currentButtonText_1: '0',
      currentButtonText_2: '1',
      currentButtonText_3: '2',
      currentButtonText_4: '3',
      //currentButtonActive_0: { background: '#d3e0ee', color: '#006DD9' },
      currentButtonActive_0: { background: 'auto' },
      currentButtonActive_1: { background: 'auto' },
      currentButtonActive_2: { background: 'auto' },
      currentButtonActive_3: { background: 'auto' },
      currentButClassName: 'visible',
      currentRound: '',
      currentRoundNumber: '',
      roundAudio: '',
      roundImg: '',
      gameInfoStyle: { display: 'none' },
      audioButtonText: 'Повторить',
      audioButtonClassName: this.audioButtonClass + '__sound-button',
    }
    this.roundAudio = new Audio(this.state.roundAudio);
  }

  startGameOnClick(e: React.MouseEvent<HTMLElement>) {
    audioCallPageModel.isSetting = false;
    this.forceUpdate();
  }

  closeGameOnClick(e: React.MouseEvent<HTMLElement>) {
    audioCallPageModel.isSetting = true;
    this.forceUpdate();
  }

  async componentDidMount() {
    const data = await applicationModel.getWords(0, 0);
    this.state.isLoading = false;
    this.wordsArray = data;
    if (this.wordsArray != undefined) {
      this.gameModel = new AudioCallGameModel(this.wordsArray);
    }
    this.roundWordsArray = this.gameModel.roundWords();
    this.state.currentButtonText_1 = this.roundWordsArray[0].word;
    this.state.currentButtonText_2 = this.roundWordsArray[1].word;
    this.state.currentButtonText_3 = this.roundWordsArray[2].word;
    this.state.currentButtonText_4 = this.roundWordsArray[3].word;
    this.state.roundAudio = this.gameModel.roundAUdio;
    this.state.roundImg = this.gameModel.roundImg;
    this.state.currentRound = this.gameModel.currentRound.toString();
    this.state.currentRoundNumber = this.gameModel.currentWordsArrayLangth.toString();

    this.forceUpdate();
  }

  hiddenInfoOnClick(e: React.MouseEvent<HTMLElement>) {
    this.setState(
      this.state.gameInfoStyle = { display: 'none' },
    );
  }

  getButtonDatatypeOnClick(e: React.MouseEvent<HTMLElement>) {
    const elem = e.target as HTMLElement;
    const elemNumber = elem.getAttribute('data-index');

    if (elemNumber != null) {
      this.setState({ correct: this.state.audioButtonText = 'Далее' });
      this.setState({ correct: this.state.audioButtonClassName = this.audioButtonClass + '__nav-button' });
      this.setState({ correct: this.state.currentButClassName = 'blocked' });
      this.currentActiveButton(elemNumber);



      const isTrueAnswer = this.gameModel.isAnswerTrue(+elemNumber);
    }
  }

  currentActiveButton(buttonNumber: string) {
    switch (buttonNumber) {
      case '0':
        this.setState(this.state.currentButtonActive_0 = { background: '#d3e0ee' })
        break;
      case '1':
        this.setState(this.state.currentButtonActive_1 = { background: '#d3e0ee' })
        break;
      case '2':
        this.setState(this.state.currentButtonActive_2 = { background: '#d3e0ee' })
        break;
      case '3':
        this.setState(this.state.currentButtonActive_3 = { background: '#d3e0ee' })
        break;

      default:
        break;
    }
  }

  truAnsewrModel() {

  }

  render() {
    //console.log('Рендер вызвался');
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <main className="main">
          <div className='games-page-wrap'>
            <h1>А У Д И О  В Ы З О В</h1>
            <div className='games-page-wrap__game-wrap'>
              <div color='blue'>Загрузка</div>
            </div>
          </div>
        </main>
      )
    }
    return (

      <main className="main">
        <div className='games-page-wrap'>
          <h1>А У Д И О  В Ы З О В</h1>
          <div className='games-page-wrap__game-wrap'>
            <GameInfo gameInfoStyle={this.state.gameInfoStyle}>
              <p>Добро пожаловать в игру Аудио вызов</p>
              <div onClick={(e) => { this.hiddenInfoOnClick(e) }}>
                <Music
                  className='games-page-wrap__game-wrap__audio-call__game__repeat'
                  url={this.state.roundAudio}>
                  <button className='games-page-wrap__game-wrap__audio-call__game__repeat__button'>Начать</button>
                </Music>
              </div>
            </GameInfo>
            <section className='games-page-wrap__game-wrap__audio-call'>
              <section className='games-page-wrap__game-wrap__audio-call__top-settings'>
                <div className='games-page-wrap__game-wrap__audio-call__top-settings__left'>
                  <BellSVG
                    bellFill='#006DD9'
                    hellStroke='none'
                    bellWidth='30px' />
                  <div
                    className='games-page-wrap__game-wrap__audio-call__top-settings__left__level'
                    style={this.state.currentLevelColor}
                  >{this.state.currentLevel}</div>
                </div>
                <div className='games-page-wrap__game-wrap__audio-call__top-settings__right'>
                  <p className='games-page-wrap__game-wrap__audio-call__top-settings__right__round-number'>{this.state.currentRound}/{this.state.currentRoundNumber}</p>
                  <div className='games-page-wrap__game-wrap__audio-call__top-settings__right__heards-error'>
                    <HeardsError heardFill={this.state.heardFill_1} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_2} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_3} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_4} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_5} heardStroke={this.state.heardStroke} />
                  </div>
                  <div
                    className='games-page-wrap__game-wrap__audio-call__top-settings__right__cross'
                    onClick={(e) => { this.closeGameOnClick(e) }}>
                    <CrossUpDate crossId='audio-game-cross' />
                  </div>
                </div>
              </section>
              <section className='games-page-wrap__game-wrap__audio-call__game'>
                <div className='games-page-wrap__game-wrap__audio-call__game__audio-img'>
                  <Soundview />
                </div>

                <Music
                  className='games-page-wrap__game-wrap__audio-call__game__repeat'
                  url={this.state.roundAudio}>
                  <button className={this.state.audioButtonClassName}>
                    {this.state.audioButtonText}
                  </button>
                </Music>
              </section>
              <section className='games-page-wrap__game-wrap__audio-call__game-button'>
                <GameButton>
                  <button
                    className={this.state.currentButClassName}
                    style={this.state.currentButtonActive_0}
                    data-index='0'
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}
                  >{this.state.currentButtonText_1}</button>
                  <button
                    className={this.state.currentButClassName}
                    style={this.state.currentButtonActive_1}
                    data-index='1'
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}>{this.state.currentButtonText_2}</button>
                  <button
                    className={this.state.currentButClassName}
                    style={this.state.currentButtonActive_2}
                    data-index='2'
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}>{this.state.currentButtonText_3}</button>
                  <button
                    className={this.state.currentButClassName}
                    style={this.state.currentButtonActive_3}
                    data-index='3'
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}>{this.state.currentButtonText_4}</button>
                </GameButton>
              </section>
            </section>
          </div>
        </div>
      </main >
    );
  }
}


export { AudioCallGame };