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
  answerIndicator: { background: string },
  nextRoundBUttonWrapClass: string,
  statisticsRoundInfo: string,
  statisticsDisplay: { display: string },
  soundClass: string,
  levelEnd: { display: string },
  levelEndText: { display: string },
  smile: string,
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
      answerIndicator: { background: '' },
      nextRoundBUttonWrapClass: 'games-page-wrap__game-wrap__audio-call__game__repeat displayNone',
      statisticsRoundInfo: '',
      soundClass: 'games-page-wrap__sprint__wrap__game__settings__left__bell-on',
      levelEnd: { display: 'block' },
      levelEndText: { display: 'none' },
      currentQuestion: '',
      statisticsDisplay: { display: 'none' },
      smile: 'games-page-wrap__sprint__wrap__game__body__question question',
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
    this.upDateRound();
    //this.updatePageInfo();
  }

  upDateRound() {
    this.sprintRoundWordsArray = this.gameModel.sprintRoundWords();
    console.log(this.gameModel.sprintRoundWordsArray);
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
    const elem = e.target as HTMLElement;
    const elemType = elem.getAttribute('data-index');
    const isAnswerTrue = this.sprintRoundWordsArray[0].isTrueAnxwer;

    if (elemType != null) {
      if ((elemType === 'true' && isAnswerTrue) || (elemType === 'false' && !isAnswerTrue)) {
        const audio = new Audio(true_answer);
        if (this.isSoundOn) {
          audio.play();
        }
        this.setState({
          smile: 'games-page-wrap__sprint__wrap__game__body__question true',
        });
        //this.gamePoint +=  
      } else {
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
    console.log('pointCoustArray');
    console.log(pointCoustArray);
    return pointCoustArray;
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
                  <p>1</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_2} />
                  </div>
                  <p>{pountUp}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_3} />
                  </div>
                  <p>{pountUp ** 2}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_4} />
                  </div>
                  <p>{pountUp ** 3}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_5} />
                  </div>
                  <p>{pountUp ** 4}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_6} />
                  </div>
                  <p>{pountUp ** 5}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_7} />
                  </div>
                  <p>{pountUp ** 6}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_8} />
                  </div>
                  <p>{pountUp ** 7}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_9} />
                  </div>
                  <p>{pountUp ** 8}</p>
                </div>
                <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap'>
                  <div className='games-page-wrap__sprint__wrap__point-panel__heard-wrap__heard'>
                    <HeardsError heardStroke={this.state.heardStroke} heardFill={this.state.heardFill_10} />
                  </div>
                  <p>{pountUp ** 9}</p>
                </div>
              </section>
              <section className='games-page-wrap__sprint__wrap__game'>
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
                    <div className='games-page-wrap__sprint__wrap__game__settings__right__point'>
                      0
                    </div>
                  </div>

                </section>
                <section className='games-page-wrap__sprint__wrap__game__body'>
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
                <div className='games-page-wrap__sprint__wrap__timer__clock'>
                  <p className='games-page-wrap__sprint__wrap__timer__clock__time'>60</p>
                </div>
                <button className='games-page-wrap__sprint__wrap__timer__start'>Начать</button>
              </section>
            </section>
          </div>
        </div>
      </main >
    );
  }
}

export { SprintGame };