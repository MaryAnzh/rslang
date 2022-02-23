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
        this.trueAnswerCount += 1;
        this.gamePoint += 1;
        const audio = new Audio(true_answer);
        if (this.isSoundOn) {
          audio.play();
        }
        this.setState({
          smile: 'games-page-wrap__sprint__wrap__game__body__question true',
          
        });
        
      } else {
        userStorage.delEasyWordGame(this.gameModel.currentTrueWordId);
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

    this.gameModel.sprintRoundWords();
    this.defaultState();
    // this.forceUpdate();
  }

  defaultState() {
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
                  <p>{this.pointCoustCoust[0]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_2} />
                  </div>
                  <p>{this.pointCoustCoust[1]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_3} />
                  </div>
                  <p>{this.pointCoustCoust[2]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_4} />
                  </div>
                  <p>{this.pointCoustCoust[3]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_5} />
                  </div>
                  <p>{this.pointCoustCoust[4]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_6} />
                  </div>
                  <p>{this.pointCoustCoust[5]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_7} />
                  </div>
                  <p>{this.pointCoustCoust[6]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_8} />
                  </div>
                  <p>{this.pointCoustCoust[7]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_9} />
                  </div>
                  <p>{this.pointCoustCoust[8]}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_10} />
                  </div>
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
                    className='round-statistics__button'>Играть этот раунд</button>
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
                  <div className='games-page-wrap__sprint__wrap__timer__current-time__sec-count'>
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
                  className='games-page-wrap__sprint__wrap__timer__start'
                  onClick={(e) => { this.startGame(e) }}
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