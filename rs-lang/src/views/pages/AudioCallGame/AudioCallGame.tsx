import React from 'react';
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
  currentRound: string,
  currentRoundNumber: string,
  roundAudio: string,
  roundImg: string
}

class AudioCallGame extends React.Component {
  state: AudioCallGameType;

  gameModel: AudioCallGameModel;

  wordsArray: WordCardType[] | undefined;

  roundWordsArray: IAnxwer[];

  roundAudio: HTMLAudioElement;

  constructor(props: {}) {
    super(props);
    this.wordsArray = [];
    this.gameModel = new AudioCallGameModel(this.wordsArray);
    this.roundWordsArray = [];
    this.state = {
      isLoading: true,
      heardFill_1: 'none',
      heardFill_2: '#A66200',
      heardFill_3: '#A66200',
      heardFill_4: '#A66200',
      heardFill_5: '#A66200',
      heardStroke: '#A66200',
      currentLevel: 'Уровень сложности 1',
      currentLevelColor: { background: '#FFB140' },
      currentButtonText_1: '0',
      currentButtonText_2: '1',
      currentButtonText_3: '2',
      currentButtonText_4: '3',
      currentRound: '0',
      currentRoundNumber: '0',
      roundAudio: '',
      roundImg: '',
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

    this.forceUpdate();
  }

  render() {

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
                <div className='games-page-wrap__game-wrap__audio-call__game__audio'></div>

                <Music
                  className='games-page-wrap__game-wrap__audio-call__game__repeat'
                  url={this.state.roundAudio}>
                  <button className='games-page-wrap__game-wrap__audio-call__game__repeat__button'>Повторить</button>
                </Music>
              </section>
              <section className='games-page-wrap__game-wrap__audio-call__game-button'>
                <GameButton>
                  <button>{this.state.currentButtonText_1}</button>
                  <button>{this.state.currentButtonText_2}</button>
                  <button>{this.state.currentButtonText_3}</button>
                  <button>{this.state.currentButtonText_4}</button>
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