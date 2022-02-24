import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './../AudioCallGame/AudioCallGame.scss';
import './sprintGame.scss';
import '../../elements/settingPanel/settingPanel';
import { HeardsError } from '../../audioCallElements/heardsErrior/heardsError';
import { GameButton } from '../../audioCallElements/gameButton/gameButton';
import { AudioCallGameModel } from '../../../model/audioCallGameModel';
import { WordCardType } from '../../../interfaces/types';
import { applicationModel } from '../../../model/ApplicationModel';
import { ISprintRoundWords } from '../../../interfaces/wordsInterface';
import { userStorage } from '../../../model/UserStorage';
import true_answer from '../../../sound/true_answer.mp3';
import false_answer from '../../../sound/false_answer.mp3';
import bell_sound from '../../../sound/bell-sound.mp3'
import over from '../../../sound/over.mp3';

type SprintGameType = {
  isLoading: boolean,
  heardFill_1: string,
  heardFill_2: string,
  heardFill_3: string,
  heardFill_4: string,
  heardFill_5: string,
  heardFill_6: string,
  heardFill_7: string,
  heardFill_8: string,
  heardFill_9: string,
  heardFill_10: string,
  heardFill_2g: string,
  heardFill_3g: string,
  heardFill_4g: string,
  heardFill_5g: string,
  heardFill_6g: string,
  heardFill_7g: string,
  heardFill_8g: string,
  heardFill_9g: string,
  heardFill_10g: string
  heardStroke: string,
  heardStroke2: string,
  currentLevel: string,
  currentLevelColor: { background: string },
  currentQuestion: string,
  currentRound: string,
  currentRoundNumber: string,
  roundAudio: string,
  gameInfoStyle: { display: string },
  statisticsRoundInfo: string,
  statisticsDisplay: { display: string },
  soundClass: string,
  levelEnd: { display: string },
  levelEndText: { display: string },
  smile: string,
  currentTime: number,
  check_15: { display: string },
  check_30: { display: string },
  check_60: { display: string },
  gameClass: string,
  pointStyle_1: { display: string },
  pointStyle_2: { display: string },
  pointStyle_3: { display: string },
  pointStyle_4: { display: string },
  pointStyle_5: { display: string },
  pointStyle_6: { display: string },
  pointStyle_7: { display: string },
  pointStyle_8: { display: string },
  pointStyle_9: { display: string },
  pointStyle_10: { display: string },
  startButton: string,
  startTime: string,
}

class SprintGame extends React.Component {
  state: SprintGameType;

  gameModel: AudioCallGameModel;

  wordsArray: WordCardType[] | undefined;

  sprintRoundWordsArray: ISprintRoundWords[];

  roundAudio: HTMLAudioElement;

  isSoundOn = true;

  gamePoint = 0;

  pointCoustCoust = this.pointCoust();

  correctAnswersSeries = 0;

  gameTime = 15;

  trueAnswerCount = 0;

  allRoundAnswerCount = 0;

  constructor(props: {}) {
    super(props);
    this.wordsArray = [];
    this.gameModel = new AudioCallGameModel(this.wordsArray);
    this.sprintRoundWordsArray = [];
    this.state = {
      isLoading: true,
      heardFill_1: '#FFB140',
      heardFill_2: '#E9A847',
      heardFill_3: '#D29F4E',
      heardFill_4: '#B99555',
      heardFill_5: '#A28B5C',
      heardFill_6: '#8B8163',
      heardFill_7: '#74786A',
      heardFill_8: '#5F6F70',
      heardFill_9: '#2C5A7F',
      heardFill_10: '#0C283D',
      heardStroke: 'white',
      heardFill_2g: 'none',
      heardFill_3g: 'none',
      heardFill_4g: 'none',
      heardFill_5g: 'none',
      heardFill_6g: 'none',
      heardFill_7g: 'none',
      heardFill_8g: 'none',
      heardFill_9g: 'none',
      heardFill_10g: 'none',
      heardStroke2: '#006DD9',
      currentLevel: 'Уровень сложности ' + (applicationModel.gameLevel + 1),
      currentLevelColor: { background: this.gameLevelColor(applicationModel.gameLevel) },
      currentRound: '',
      currentRoundNumber: '',
      roundAudio: '',
      gameInfoStyle: { display: 'flex' },
      statisticsRoundInfo: `${this.trueAnswerCount}  из  ${this.allRoundAnswerCount}`,
      soundClass: 'games-page-wrap__sprint__wrap__game__settings__left__bell-on',
      levelEnd: { display: 'block' },
      levelEndText: { display: 'none' },
      currentQuestion: '',
      statisticsDisplay: { display: 'none' },
      smile: 'games-page-wrap__sprint__wrap__game__body__question question',
      currentTime: 15,
      check_15: { display: 'block' },
      check_30: { display: 'none' },
      check_60: { display: 'none' },
      gameClass: 'games-page-wrap__sprint__wrap__game__body blocked',
      pointStyle_1: { display: 'flex' },
      pointStyle_2: { display: 'none' },
      pointStyle_3: { display: 'none' },
      pointStyle_4: { display: 'none' },
      pointStyle_5: { display: 'none' },
      pointStyle_6: { display: 'none' },
      pointStyle_7: { display: 'none' },
      pointStyle_8: { display: 'none' },
      pointStyle_9: { display: 'none' },
      pointStyle_10: { display: 'none' },
      startButton: 'games-page-wrap__sprint__wrap__timer__start',
      startTime: 'games-page-wrap__sprint__wrap__timer__current-time__sec-count',
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
    let data: WordCardType[] | undefined = [];
    if (applicationModel.gameFromBook) {
      data = applicationModel.currentWordArray;
    } else {
      const level = applicationModel.gameLevel;
      const page = applicationModel.gamePage;
      data = await applicationModel.getWords(level, page);
    }

    this.wordsArray = data;
    if (this.wordsArray != undefined) {
      this.gameModel = new AudioCallGameModel(this.wordsArray);
    }
    //this.updatePageInfo();
  }

  upDateRound() {
    this.sprintRoundWordsArray = this.gameModel.sprintRoundWords();
    // console.log(this.gameModel.sprintRoundWordsArray);
    const question = this.gameModel.sprintRoundWordsArray[0];
    const questionText = question.word + ' - ' + question.translate;
    this.setState({
      currentQuestion: questionText,
    });
  }

  async componentDidMount() {
    this.loadGame();
    this.setState({ isLoading: false });
  }

  soundOnOf(e: React.MouseEvent<HTMLElement>) {

    if (this.isSoundOn) {
      this.setState({
        soundClass: 'games-page-wrap__sprint__wrap__game__settings__left__bell-of',
      });
      this.isSoundOn = false;
    } else {
      this.setState({
        soundClass: 'games-page-wrap__sprint__wrap__game__settings__left__bell-on',
      });
      this.isSoundOn = true;
    }
  }

  getButtonDatatypeOnClick(e: React.MouseEvent<HTMLElement>) {
    this.allRoundAnswerCount += 1;

    const elem = e.target as HTMLElement;
    const elemType = elem.getAttribute('data-index');
    const isAnswerTrue = this.sprintRoundWordsArray[0].isTrueAnxwer;

    if (elemType != null) {
      if ((elemType === 'true' && isAnswerTrue) || (elemType === 'false' && !isAnswerTrue)) {
        userStorage.addProgressWord(this.gameModel.currentTrueWordId, 'sprint', true);
        this.trueAnswerCount += 1;
        this.correctAnswersSeries += 1;

        const dauble = 4;
        if (this.correctAnswersSeries < dauble) {
          this.gamePoint += this.pointCoustCoust[0];
        }
        if (this.correctAnswersSeries >= dauble && this.correctAnswersSeries < (2 * dauble)) {
          this.gamePoint += this.pointCoustCoust[1];
          this.setState({
            heardFill_2g: '#E9A847',
            pointStyle_1: { display: 'none' },
            pointStyle_2: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (2 * dauble) && this.correctAnswersSeries < (3 * dauble)) {
          this.gamePoint += this.pointCoustCoust[2];
          this.setState({
            heardFill_3g: '#D29F4E',
            pointStyle_2: { display: 'none' },
            pointStyle_3: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (3 * dauble) && this.correctAnswersSeries < (4 * dauble)) {
          this.gamePoint += this.pointCoustCoust[3];
          this.setState({
            heardFill_4g: '#B99555',
            pointStyle_3: { display: 'none' },
            pointStyle_4: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (4 * dauble) && this.correctAnswersSeries < (5 * dauble)) {
          this.gamePoint += this.pointCoustCoust[4];
          this.setState({
            heardFill_5g: '#A28B5C',
            pointStyle_4: { display: 'none' },
            pointStyle_5: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (5 * dauble) && this.correctAnswersSeries < (6 * dauble)) {
          this.gamePoint += this.pointCoustCoust[5];
          this.setState({
            heardFill_6g: '#8B8163',
            pointStyle_5: { display: 'none' },
            pointStyle_6: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (6 * dauble) && this.correctAnswersSeries < (7 * dauble)) {
          this.gamePoint += this.pointCoustCoust[6];
          this.setState({
            heardFill_7g: '#74786A',
            pointStyle_6: { display: 'none' },
            pointStyle_7: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (7 * dauble) && this.correctAnswersSeries < (8 * dauble)) {
          this.gamePoint += this.pointCoustCoust[7];
          this.setState({
            heardFill_8g: '#5F6F70',
            pointStyle_7: { display: 'none' },
            pointStyle_8: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (8 * dauble) && this.correctAnswersSeries < (9 * dauble)) {
          this.gamePoint += this.pointCoustCoust[8];
          this.setState({
            heardFill_9g: '#2C5A7F',
            pointStyle_8: { display: 'none' },
            pointStyle_9: { display: 'flex' },
          });
        }
        if (this.correctAnswersSeries >= (9 * dauble) && this.correctAnswersSeries < (10 * dauble)) {
          this.gamePoint += this.pointCoustCoust[9];
          this.setState({
            heardFill_10g: '#0C283D',
            pointStyle_9: { display: 'none' },
            pointStyle_10: { display: 'flex' },
          });
        }

        const audio = new Audio(true_answer);
        if (this.isSoundOn) {
          audio.play();
        }
        this.setState({
          smile: 'games-page-wrap__sprint__wrap__game__body__question true',

        });

      } else {
        userStorage.addProgressWord(this.gameModel.currentTrueWordId, 'sprint', false);
        userStorage.delEasyWordGame(this.gameModel.currentTrueWordId);
        this.correctAnswersSeries = 0;
        this.defaultHeardState();
        const audio = new Audio(false_answer);
        if (this.isSoundOn) {
          audio.play();
        }
        this.setState({
          smile: 'games-page-wrap__sprint__wrap__game__body__question false',
        });
      }
    }
    this.gameModel.itemIndex += 1;
    setTimeout(() => this.setState({
      smile: 'games-page-wrap__sprint__wrap__game__body__question question',
    }), 500);
    this.upDateRound();
  }

  pointCoust() {
    const maxDouble = 9;
    const minPointCoust = 1;
    const pointCoustArray: number[] = [];
    for (let i = 0; i <= maxDouble; i += 1) {
      const popntCoust = (minPointCoust * 2) ** i;
      pointCoustArray.push(popntCoust);
    }
    return pointCoustArray;
  }

  startGame(e: React.MouseEvent<HTMLElement>) {
    let time = this.gameTime;
    this.setState({
      gameClass: 'games-page-wrap__sprint__wrap__game__body',
      startButton: 'games-page-wrap__sprint__wrap__timer__start blocked',
      startTime: 'games-page-wrap__sprint__wrap__timer__current-time__sec-count blocked',
    });
    const timer = setInterval(() => {
      if (time == 0) {
        clearInterval(timer);
        if (this.isSoundOn) {
          const audio = new Audio(over);
          audio.play();
        }
        const text = `${this.trueAnswerCount}  из  ${this.allRoundAnswerCount}`;
        this.setState({
          statisticsDisplay: { display: 'flex' },
          statisticsRoundInfo: text,
          gameClass: 'games-page-wrap__sprint__wrap__game__body blocked',
        });
        return;
      }
      this.setState({
        currentTime: time - 1,
      });
      time -= 1;
    }, 1000);
    if (this.isSoundOn) {
      const audio = new Audio(bell_sound);
      audio.play();
    }

    this.upDateRound();
  }

  chackTimeOnClick(e: React.MouseEvent<HTMLElement>) {
    this.setState({
      check_15: { display: 'none' },
      check_30: { display: 'none' },
      check_60: { display: 'none' },
    });
    const elem = e.target as HTMLElement;
    const time = elem.getAttribute('data-time');
    switch (time) {
      case '15':
        this.gameTime = 15;
        this.setState({
          check_15: { display: 'block' },
          currentTime: this.gameTime,
        });
        break;
      case '30':
        this.gameTime = 30;
        this.setState({
          check_30: { display: 'block' },
          currentTime: this.gameTime,
        });
        break;
      case '60':
        this.gameTime = 60;
        this.setState({
          check_60: { display: 'block' },
          currentTime: this.gameTime,
        });
        break;
      default:
        break;
    }

  }

  playAgaineOnClick(e: React.MouseEvent<HTMLElement>) {
    this.gameAgainUpdate();
  }

  gameAgainUpdate() {
    this.gameModel.itemIndex = 0;
    this.gameModel.currentRound = 1;

    this.allRoundAnswerCount = 0;
    this.trueAnswerCount = 0;
    this.gamePoint = 0;
    this.correctAnswersSeries = 0;

    this.gameModel.sprintRoundWords();
    this.defaultState();
    // this.forceUpdate();
  }

  defaultState() {
    this.gamePoint = 0;
    this.correctAnswersSeries = 0;
    this.gameTime = 15;
    this.setState({
      heardFill_2g: 'none',
      heardFill_3g: 'none',
      heardFill_4g: 'none',
      heardFill_5g: 'none',
      heardFill_6g: 'none',
      heardFill_7g: 'none',
      heardFill_8g: 'none',
      heardFill_9g: 'none',
      heardFill_10g: 'none',
      heardStroke2: '#006DD9',
      currentLevel: 'Уровень сложности ' + (applicationModel.gameLevel + 1),
      currentLevelColor: { background: this.gameLevelColor(applicationModel.gameLevel) },
      currentRound: '',
      currentRoundNumber: '',
      roundAudio: '',
      statisticsRoundInfo: `${this.trueAnswerCount}  из  ${this.allRoundAnswerCount}`,
      levelEnd: { display: 'block' },
      levelEndText: { display: 'none' },
      currentQuestion: '',
      statisticsDisplay: { display: 'none' },
      smile: 'games-page-wrap__sprint__wrap__game__body__question question',
      currentTime: 15,
      check_15: { display: 'block' },
      check_30: { display: 'none' },
      check_60: { display: 'none' },
      gameClass: 'games-page-wrap__sprint__wrap__game__body blocked',
      pointStyle_1: { display: 'flex' },
      pointStyle_2: { display: 'none' },
      pointStyle_3: { display: 'none' },
      pointStyle_4: { display: 'none' },
      pointStyle_5: { display: 'none' },
      pointStyle_6: { display: 'none' },
      pointStyle_7: { display: 'none' },
      pointStyle_8: { display: 'none' },
      pointStyle_9: { display: 'none' },
      pointStyle_10: { display: 'none' },
      startButton: 'games-page-wrap__sprint__wrap__timer__start',
      startTime: 'games-page-wrap__sprint__wrap__timer__current-time__sec-count',
    });
  }

  defaultHeardState() {
    this.setState({
      heardFill_2g: 'none',
      heardFill_3g: 'none',
      heardFill_4g: 'none',
      heardFill_5g: 'none',
      heardFill_6g: 'none',
      heardFill_7g: 'none',
      heardFill_8g: 'none',
      heardFill_9g: 'none',
      heardFill_10g: 'none',
      pointStyle_1: { display: 'flex' },
      pointStyle_2: { display: 'none' },
      pointStyle_3: { display: 'none' },
      pointStyle_4: { display: 'none' },
      pointStyle_5: { display: 'none' },
      pointStyle_6: { display: 'none' },
      pointStyle_7: { display: 'none' },
      pointStyle_8: { display: 'none' },
      pointStyle_9: { display: 'none' },
      pointStyle_10: { display: 'none' },
    });
  }

  async playNextRoundOnClick(e: React.MouseEvent<HTMLElement>) {
    const maxPageNumber = 29;

    if (applicationModel.gamePage < maxPageNumber) {
      applicationModel.gamePage += 1;
      await this.loadGame();
      this.gameAgainUpdate();
      this.forceUpdate();
    } else {
      applicationModel.gamePage = 0;
      this.setState({
        levelEnd: { display: 'none' },
        levelEndText: { display: 'block' },
      });
    }
  }

  onKeyDownButton(e: React.KeyboardEvent<HTMLButtonElement>) {
    console.log('KeyboardEvent');
    console.log(e);
  }

  render() {
    const { isLoading } = this.state;
    const pountUp = 2;
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
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <h3>Стоимость ответа в баллах</h3>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_1} />
                  </div>
                  <div style={this.state.pointStyle_1} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[0]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_2} />
                  </div>
                  <div style={this.state.pointStyle_2} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[1]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_3} />
                  </div>
                  <div style={this.state.pointStyle_3} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[2]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_4} />
                  </div>
                  <div style={this.state.pointStyle_4} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[3]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_5} />
                  </div>
                  <div style={this.state.pointStyle_5} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[4]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_6} />
                  </div>
                  <div style={this.state.pointStyle_6} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[5]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_7} />
                  </div>
                  <div style={this.state.pointStyle_7} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[6]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_8} />
                  </div>
                  <div style={this.state.pointStyle_8} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[7]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_9} />
                  </div>
                  <div style={this.state.pointStyle_9} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[8]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_10} />
                  </div>
                  <div style={this.state.pointStyle_10} className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__current-point'></div>
                  <p>{this.pointCoustCoust[9]}</p>
                </div>
              </section>
              <section className="games-page-wrap__sprint__wrap__game">
                <div className='sprint-round-statistics'
                  style={this.state.statisticsDisplay}>
                  <h2>Статистика раунда</h2>
                  <p >Набранные баллы</p>
                  <p className='sprint-round-statistics__answer-count'>
                    {this.gamePoint}
                  </p>
                  <p >Прввильные слова</p>
                  <p className='sprint-round-statistics__answer-count'>
                    {this.state.statisticsRoundInfo}
                  </p>
                  <button
                    onClick={(e) => { this.playAgaineOnClick(e) }}
                    className='round-statistics__button'>                    
                    Играть этот раунд</button>
                  <button
                    style={this.state.levelEnd}
                    onClick={(e) => { this.playNextRoundOnClick(e) }}
                    className='round-statistics__button'>
                    Следующий раунд
                  </button>
                  <p style={this.state.levelEndText}>Поздравляю! Вы прошли уровень. Перейдите в настройки, что бы выбрать новый уровень</p>
                  <Link to='/sprint-settings'>
                    <p>Выйти</p>
                    <div className='setting-icon'></div>
                  </Link>

                </div>
                <section className='games-page-wrap__sprint__wrap__game__settings'>
                  <div className='games-page-wrap__sprint__wrap__game__settings__left'>
                    <div
                      onClick={(e) => { this.soundOnOf(e) }}
                      className={this.state.soundClass}>
                    </div>
                    <div
                      className='games-page-wrap__sprint__wrap__game__settings__left__level'
                      style={this.state.currentLevelColor}
                    >{this.state.currentLevel}</div>
                  </div>

                  <div className='games-page-wrap__sprint__wrap__game__settings__right'>
                    <p className='games-page-wrap__sprint__wrap__game__settings__right__question-count'>{this.trueAnswerCount} / {this.allRoundAnswerCount}</p>
                    <div className='games-page-wrap__sprint__wrap__game__settings__right__point'>
                      {this.gamePoint}
                    </div>
                  </div>
                </section>
                <section className={this.state.gameClass}>
                  <div className={this.state.smile}>
                    <div className='games-page-wrap__sprint__wrap__game__body__question__heard-point'>
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_1} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_2g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_3g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_4g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_5g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_6g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_7g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_8g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_9g} />
                      <HeardsError heardStroke={this.state.heardStroke2} heardFill={this.state.heardFill_10g} />

                    </div>
                    <div className='games-page-wrap__sprint__wrap__game__body__question__text'>

                      <p>{this.state.currentQuestion}</p>
                    </div>

                  </div>
                  <div className='games-page-wrap__sprint__wrap__game__body__buttons'>
                    <button
                      className='games-page-wrap__sprint__wrap__game__body__buttons__answer'
                      onClick={(e) => { this.getButtonDatatypeOnClick(e) }}
                      data-index='true'
                      
                    >Верно</button>
                    <button
                      className='games-page-wrap__sprint__wrap__game__body__buttons__answer'
                      onClick={(e) => { this.getButtonDatatypeOnClick(e) }}
                      data-index='false'
                      
                    >Не верно</button>
                  </div>

                </section>

              </section>
              <section className='games-page-wrap__sprint__wrap__timer'>
                <div className='games-page-wrap__sprint__wrap__timer__current-time'>
                  
                  <p>Выбрать продолжительность игры</p>
                  <div className={this.state.startTime}>
                    <div className='games-page-wrap__sprint__wrap__timer__current-time__sec-count__seconds'>
                      <p>15</p>
                      <div className='check'
                        onClick={(e) => { this.chackTimeOnClick(e) }}
                        data-time="15">
                        <div className='check-on' style={this.state.check_15}></div>
                      </div>
                    </div>
                    <div className='games-page-wrap__sprint__wrap__timer__current-time__sec-count__seconds'>
                      <p>30</p>
                      <div className='check'
                        onClick={(e) => { this.chackTimeOnClick(e) }}
                        data-time="30">
                        <div className='check-on' style={this.state.check_30}></div>
                      </div>
                    </div>
                    <div className='games-page-wrap__sprint__wrap__timer__current-time__sec-count__seconds'>
                      <p>60</p>
                      <div className='check'
                        onClick={(e) => { this.chackTimeOnClick(e) }}
                        data-time="60">
                        <div className='check-on' style={this.state.check_60}></div>
                      </div>
                    </div>


                  </div>
                </div>
                <div className='games-page-wrap__sprint__wrap__timer__clock'>
                  <p className='games-page-wrap__sprint__wrap__timer__clock__time'>
                    {this.state.currentTime}
                  </p>
                </div>
                <button
                  className={this.state.startButton}
                  onClick={(e) => { this.startGame(e) }}
                  tabIndex={1}
                  onKeyDown={(e) => { this.onKeyDownButton(e)}}
                >Начать</button>
              </section>
            </section>
          </div>
        </div>
      </main >
    );
  }
}

export { SprintGame };