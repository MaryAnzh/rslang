import React, { AnimationEvent } from 'react';
import { Link } from 'react-router-dom';
import './../AudioCallGame/AudioCallGame.scss';
import './sprintGame.scss';
import '../../elements/settingPanel/settingPanel';
import { HeardsError } from '../../audioCallElements/heardsErrior/heardsError';
import { GameButton } from '../../audioCallElements/gameButton/gameButton';
import { AudioCallGameModel } from '../../../model/audioCallGameModel';
import { WordCardType } from '../../../interfaces/types';
import { applicationModel } from '../../../model/ApplicationModel';
import { Music } from '../../components/music/music';
import { GameInfo } from '../../audioCallElements/gameInfo/gameInfo';
import { Soundview } from '../../audioCallElements/soundView/soundview';
import trueCheck from '../../../img/png/true.png';
import cross from '../../../img/png/cross.png';
import true_answer from '../../../sound/true_answer.mp3';
import false_answer from '../../../sound/false_answer.mp3';

type SprintGameType = {
  isLoading: boolean,
  heardFill_1: string,
  heardFill_2: string,
  heardFill_3: string,
  heardFill_4: string,
  heardFill_5: string,
  heardStroke: string,
  currentLevel: string,
  currentLevelColor: { background: string },
  currentQuestion: string,
  currentRound: string,
  currentRoundNumber: string,
  roundAudio: string,
  gameInfoStyle: { display: string },
  answerIndicator: { background: string },
  nextRoundBUttonWrapClass: string,
  statisticsRoundInfo: string,
  statisticsDisplay: { display: string },
  soundClass: string,
  levelEnd: { display: string },
  levelEndText: { display: string },
}

class SprintGame extends React.Component {
  state: SprintGameType;

  gameModel: AudioCallGameModel;

  wordsArray: WordCardType[] | undefined;

  roundAudio: HTMLAudioElement;

  constructor(props: {}) {
    super(props);
    this.wordsArray = [];
    this.gameModel = new AudioCallGameModel(this.wordsArray);
    this.state = {
      isLoading: true,
      heardFill_1: 'none',
      heardFill_2: 'none',
      heardFill_3: 'none',
      heardFill_4: 'none',
      heardFill_5: 'none',
      heardStroke: '#A66200',
      currentLevel: 'Уровень сложности ' + (applicationModel.gameLevel + 1),
      currentLevelColor: { background: this.gameLevelColor(applicationModel.gameLevel) },
      currentRound: '',
      currentRoundNumber: '',
      roundAudio: '',
      gameInfoStyle: { display: 'flex' },
      answerIndicator: { background: '' },
      nextRoundBUttonWrapClass: 'games-page-wrap__game-wrap__audio-call__game__repeat displayNone',
      statisticsRoundInfo: '',
      soundClass: 'games-page-wrap__game-wrap__audio-call__top-settings__left__bell',
      levelEnd: { display: 'block' },
      levelEndText: { display: 'none' },
      currentQuestion: '',
      statisticsDisplay: { display: 'none' },
    }
    this.roundAudio = new Audio(this.state.roundAudio);
  }

  gameLevelColor(levelNumber: number) {
    let color = '';
    switch (levelNumber) {
      case 0:
        color = '#FFB140';
        break;
      case 1:
        color = '#D39F4D';
        break;
      case 2:
        color = '#AC8F59';
        break;
      case 3:
        color = '#7E7C67';
        break;
      case 4:
        color = '#506975';
        break;
      case 5:
        color = '#285981';
        break;
      case 6:
        color = '#022d58';
        break;

      default:
        break;
    }
    return color;
  }

  async loadGame() {
    //берем категорию и страницу, и  запрашиваем слова
    const level = applicationModel.gameLevel;
    const page = applicationModel.gamePage;
    const data = await applicationModel.getWords(level, page);

    //если массив получен, запускаем gameNodel
    this.wordsArray = data;
    if (this.wordsArray != undefined) {
      this.gameModel = new AudioCallGameModel(this.wordsArray);
      this.gameModel.roundWords();
      //this.updatePageInfo();
    }
  }

  async componentDidMount() {
    this.loadGame();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <main className="main">
          <div className='games-page-wrap'>
            <h1>С П Р И Н Т</h1>
            <div className='games-page-wrap__sprint'>
              <div className='prelosder'>Загрузка</div>
            </div>
          </div>
        </main>
      )
    }
    return (
      <main className="main">
        <div className='games-page-wrap'>
          <h1>С П Р И Н Т</h1>
          <div className='games-page-wrap__sprint'>
            <section className='games-page-wrap__sprint__wrap'>
              <section className='games-page-wrap__sprint__wrap__point-panel'>
              </section>
              <section className='games-page-wrap__sprint__wrap__game'>

              </section>
              <section className='games-page-wrap__sprint__wrap__timer'>
                <div className='games-page-wrap__sprint__wrap__timer__wrap'></div>

              </section>
            </section>
          </div>
        </div>
      </main >
    );
  }
}

export { SprintGame };