import React, { AnimationEvent } from 'react';
import { Link } from 'react-router-dom';
import './AudioCallGame.scss';
import '../../elements/settingPanel/settingPanel';
import { HeardsError } from '../../audioCallElements/heardsErrior/heardsError';
import { BellSVG } from '../../audioCallElements/bell/bell';
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
import { captureRejectionSymbol } from 'stream';

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
  currentButtonActive_0: { filter: string },
  currentButtonActive_1: { filter: string },
  currentButtonActive_2: { filter: string },
  currentButtonActive_3: { filter: string },
  currentButClassName: string,
  currentRound: string,
  currentRoundNumber: string,
  roundAudio: string,
  roundImg: string,
  gameInfoStyle: { display: string },
  audioButtonText: string,
  soundImg: { display: string },
  wordSoundImg: { display: string, background: string },
  trueRoundWord: string,
  answerIndicator: { background: string },
  soundButton: string,
  nextRoundBUttonWrapClass: string,
  nextRoundBUttonText: string,
  nextRoundButtonCLass: string,
  statisticsRoundInfo: string,
  statisticsDosplay: { display: string },
  soundClass: string,
  levelEnd: { display: string },
  levelEndText: { display: string },
}

type ButtonType = {
  datatype: string,
}

class AudioCallGame extends React.Component {
  state: AudioCallGameType;

  gameModel: AudioCallGameModel;

  wordsArray: WordCardType[] | undefined;

  roundAudio: HTMLAudioElement;

  currentRoundNumber = 0;

  isSound = true;

  constructor(props: {}) {
    super(props);
    this.wordsArray = [];
    this.gameModel = new AudioCallGameModel(this.wordsArray);
    this.state = {
      isLoading: true,
      heardFill_1: '#C48026',
      heardFill_2: '#C48026',
      heardFill_3: '#C48026',
      heardFill_4: '#C48026',
      heardFill_5: '#C48026',
      heardStroke: '#A66200',
      currentLevel: 'Уровень сложности ' + (applicationModel.gameLevel + 1),
      currentLevelColor: { background: this.gameLevelColor(applicationModel.gameLevel) },
      currentButtonText_1: '0',
      currentButtonText_2: '1',
      currentButtonText_3: '2',
      currentButtonText_4: '3',
      //currentButtonActive_0: { background: '#d3e0ee', color: '#006DD9' },
      currentButtonActive_0: { filter: 'none' },
      currentButtonActive_1: { filter: 'none' },
      currentButtonActive_2: { filter: 'none' },
      currentButtonActive_3: { filter: 'none' },
      currentButClassName: 'visible',
      currentRound: '',
      currentRoundNumber: '',
      roundAudio: '',
      roundImg: '',
      gameInfoStyle: { display: 'flex' },
      audioButtonText: 'Повторить',
      soundImg: { display: 'flex' },
      wordSoundImg: { display: 'none', background: 'white' },
      trueRoundWord: '',
      answerIndicator: { background: '' },
      soundButton: 'displayFlex',
      nextRoundBUttonWrapClass: 'games-page-wrap__game-wrap__audio-call__game__repeat displayNone',
      nextRoundBUttonText: 'Далее',
      nextRoundButtonCLass: 'games-page-wrap__game-wrap__audio-call__game__repeat__button nav-button',
      statisticsRoundInfo: '',
      statisticsDosplay: { display: 'none' },
      soundClass: 'games-page-wrap__game-wrap__audio-call__top-settings__left__bell',
      levelEnd: { display: 'block' },
      levelEndText: { display: 'none' },
    }
    this.roundAudio = new Audio(this.state.roundAudio);
  }

  onOfAudioOnClick(e: React.MouseEvent<HTMLElement>) {
    if (this.isSound) {
      this.isSound = false;
      this.setState({
        soundClass: 'games-page-wrap__game-wrap__audio-call__top-settings__left__bell-of',
      });
    } else {
      this.isSound = true;
      this.setState({
        soundClass: 'games-page-wrap__game-wrap__audio-call__top-settings__left__bell',
      });
    }
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
      this.updatePageInfo();
    }
  }

  async componentDidMount() {
    this.loadGame();

    this.setState({ correct: this.state.isLoading = false });
    //this.forceUpdate();
  }

  hiddenInfoOnClick(e: React.MouseEvent<HTMLElement>) {
    this.setState(
      this.state.gameInfoStyle = { display: 'none' },
    );
    this.setState({
      gameInfoStyle: { display: 'none' },
    });
  }

  getButtonDatatypeOnClick(e: React.MouseEvent<HTMLElement>) {
    const elem = e.target as HTMLElement;
    const elemNumber = elem.getAttribute('data-index');

    if (elemNumber != null) {
      this.currentActiveButton(elemNumber);
      const isTrueAnswer = this.gameModel.isAnswerTrue(+elemNumber);
      this.setState({
        currentButClassName: 'blocked',
        soundImg: { display: 'none' },
        wordSoundImg: { display: 'flex', background: 'url(' + this.gameModel.roundImg + ')' },
        trueRoundWord: this.gameModel.trueRoundWord,
        soundButton: 'displayNone',
        nextRoundBUttonWrapClass: 'games-page-wrap__game-wrap__audio-call__game__repeat displayFkex',
      });

      if (isTrueAnswer) {
        if (this.gameModel.currentRound === this.gameModel.currentWordsArrayLangth) {
          this.setState({
            nextRoundBUttonText: 'Раунд окончен',
            nextRoundButtonCLass: 'games-page-wrap__game-wrap__audio-call__game__repeat__button nav-button round-end-anim',
          });
          setTimeout(() => {
            this.setState({
              statisticsRoundInfo: this.gameModel.roundTrueAnswer + '/' + this.gameModel.currentWordsArrayLangth,
              statisticsDosplay: { display: 'flex' },
            })
          }, 3000);
        }
        if (this.isSound) {
          const audio = new Audio(true_answer);
          audio.play();
        }

        this.setState({ answerIndicator: { background: 'url(' + trueCheck + ')' } });
        this.gameModel.roundTrueAnswer += 1;
      } else {
        if (this.isSound) {
          const audio = new Audio(false_answer);
          audio.play();
        }

        this.setState({
          answerIndicator: { background: 'url(' + cross + ')' },
        });
        this.gameModel.errorAnxwerCount += 1;
        this.currentError(this.gameModel.errorAnxwerCount);

        const maxErrorCornt = 5;
        if (this.gameModel.errorAnxwerCount === maxErrorCornt) {
          this.setState({
            nextRoundBUttonText: 'Раунд окончен',
            nextRoundButtonCLass: 'games-page-wrap__game-wrap__audio-call__game__repeat__button nav-button round-end-anim',
          });
          setTimeout(() => {
            this.setState({
              statisticsRoundInfo: this.gameModel.roundTrueAnswer + '/' + this.gameModel.currentWordsArrayLangth,
              statisticsDosplay: { display: 'flex' },
            })
          }, 3000);
        }
      }
    }
  }

  async nextRoundOnClick(e: React.MouseEvent<HTMLElement>) {
    this.gameModel.itemIndex += 1;
    this.gameModel.currentRound += 1;
    this.gameModel.roundWordsArray = [];
    this.gameModel.roundWords();
    this.nwxtRoundUpdateState();
    this.updatePageInfo();
  }

  nwxtRoundUpdateState() {
    this.setState({
      currentButClassName: 'visible',
      soundImg: { display: 'flex' },
      wordSoundImg: { display: 'none', background: 'none' },
      soundButton: 'displayFLex',
      roundAudio: this.gameModel.roundAUdio,
      nextRoundBUttonWrapClass: 'games-page-wrap__game-wrap__audio-call__game__repeat displayNone',
      currentButtonActive_0: { filter: 'none' },
      currentButtonActive_1: { filter: 'none' },
      currentButtonActive_2: { filter: 'none' },
      currentButtonActive_3: { filter: 'none' },
    })
  }

  updatePageInfo() {
    this.setState({
      currentButtonText_1: this.gameModel.roundWordsArray[0].word,
      currentButtonText_2: this.gameModel.roundWordsArray[1].word,
      currentButtonText_3: this.gameModel.roundWordsArray[2].word,
      currentButtonText_4: this.gameModel.roundWordsArray[3].word,
      roundAudio: this.gameModel.roundAUdio,
      roundImg: this.gameModel.roundImg,
      currentRound: this.gameModel.currentRound.toString(),
      currentRoundNumber: this.gameModel.currentWordsArrayLangth.toString(),
    });
  }

  currentActiveButton(buttonNumber: string) {
    switch (buttonNumber) {
      case '0':
        this.setState(this.state.currentButtonActive_0 = { filter: 'invert(5%) sepia(60%) saturate(2074%) hue-rotate(307deg) brightness(96%) contrast(95%)' })
        break;
      case '1':
        this.setState(this.state.currentButtonActive_1 = { filter: 'invert(5%) sepia(60%) saturate(2074%) hue-rotate(307deg) brightness(96%) contrast(95%)' })
        break;
      case '2':
        this.setState(this.state.currentButtonActive_2 = { filter: 'invert(5%) sepia(60%) saturate(2074%) hue-rotate(307deg) brightness(96%) contrast(95%)' })
        break;
      case '3':
        this.setState(this.state.currentButtonActive_3 = { filter: 'invert(5%) sepia(60%) saturate(2074%) hue-rotate(307deg) brightness(96%) contrast(95%)' })
        break;

      default:
        break;
    }
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

  currentError(errorNumber: number) {
    switch (errorNumber) {
      case 1:
        this.setState({ correct: this.state.heardFill_1 = 'none' })
        break;
      case 2:
        this.setState({ correct: this.state.heardFill_2 = 'none' })
        break;
      case 3:
        this.setState({ correct: this.state.heardFill_3 = 'none' })
        break;
      case 4:
        this.setState({ correct: this.state.heardFill_4 = 'none' })
        break;
      case 5:
        this.setState({ correct: this.state.heardFill_5 = 'none' })
        break;

      default:
        break;
    }
  }

  playAgaineOnClick(e: React.MouseEvent<HTMLElement>) {
    this.gameAgainUpdate();
  }

  async playNextRoundOnClick(e: React.MouseEvent<HTMLElement>) {
    const maxPaheNumber = 29;

    if (applicationModel.gamePage < maxPaheNumber) {
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

  gameAgainUpdate() {
    this.gameModel.itemIndex = 0;
    this.gameModel.currentRound = 1;
    this.gameModel.errorAnxwerCount = 0;
    this.currentRoundNumber = 1;
    this.gameModel.roundWords();
    this.updatePageInfo();
    this.forceUpdate();
    this.setState({
      heardFill_1: '#C48026',
      heardFill_2: '#C48026',
      heardFill_3: '#C48026',
      heardFill_4: '#C48026',
      heardFill_5: '#C48026',
      nextRoundBUttonText: 'Далее',
      nextRoundButtonCLass: 'games-page-wrap__game-wrap__audio-call__game__repeat__button nav-button',
      statisticsDosplay: { display: 'none' },
    });
    this.nwxtRoundUpdateState();
    const audip = new Audio(this.gameModel.roundAUdio);
    audip.play();
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
                  <div
                    onClick={(e) => { this.onOfAudioOnClick(e) }}
                    className={this.state.soundClass}></div>
                  <div
                    className='games-page-wrap__game-wrap__audio-call__top-settings__left__level'
                    style={this.state.currentLevelColor}
                  >{this.state.currentLevel}</div>
                  {/* <Link to='/audiocall'>
                    <div title='Страница настроек' className='games-page-wrap__game-wrap__audio-call__top-settings__right__cross'></div>
                  </Link> */}
                </div>
                <div className='games-page-wrap__game-wrap__audio-call__top-settings__center'>
                  <p className='games-page-wrap__game-wrap__audio-call__top-settings__center__page-number'>
                    Страница {applicationModel.gamePage + 1} </p>
                  <p className='games-page-wrap__game-wrap__audio-call__top-settings__center__question-number'>
                    Вопрос {this.state.currentRound}/{this.state.currentRoundNumber}</p>
                </div>

                <div className='games-page-wrap__game-wrap__audio-call__top-settings__right'>
                  <div className='games-page-wrap__game-wrap__audio-call__top-settings__right__heards-error'>
                    <HeardsError heardFill={this.state.heardFill_1} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_2} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_3} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_4} heardStroke={this.state.heardStroke} />
                    <HeardsError heardFill={this.state.heardFill_5} heardStroke={this.state.heardStroke} />
                  </div>
                </div>
              </section>
              <section className='games-page-wrap__game-wrap__audio-call__game'>
                <div className='round-statistics'
                  style={this.state.statisticsDosplay}>
                  <h2>Статистика раунда</h2>
                  <p>Прввильные слова</p>
                  <p>{this.state.statisticsRoundInfo}</p>
                  <button
                    onClick={(e) => { this.playAgaineOnClick(e) }}
                    className='round-statistics__button'>Играть этот раунд</button>
                  <button
                    style={this.state.levelEnd}
                    onClick={(e) => { this.playNextRoundOnClick(e) }}
                    className='round-statistics__button'>
                    Следующий раунд
                  </button>
                  <p style={this.state.levelEndText }>Поздравляю! Вы прошли уровень. Перейдите в настройки, что бы выбрать новый уровень</p>
                  <Link to='/audiocall'>
                    <p>Настройки</p>
                    <div className='games-page-wrap__game-wrap__audio-call__top-settings__right__cross'></div>
                  </Link>

                </div>
                <div className='games-page-wrap__game-wrap__audio-call__game__audio-img'>
                  <div style={this.state.soundImg}>
                    <Soundview />
                  </div>
                  <div
                    className='games-page-wrap__game-wrap__audio-call__game__audio-img__word'
                    style={this.state.wordSoundImg}>
                    <div className='games-page-wrap__game-wrap__audio-call__game__audio-img__word__indicator'
                      style={this.state.answerIndicator}
                    ></div>
                    <div className='games-page-wrap__game-wrap__audio-call__game__audio-img__word__true-answer'>
                      <p className='games-page-wrap__game-wrap__audio-call__game__audio-img__word__true-answer__text'>{this.state.trueRoundWord}</p>
                    </div>
                  </div>
                </div>
                <div className={this.state.soundButton}>
                  <Music
                    className='games-page-wrap__game-wrap__audio-call__game__repeat '
                    url={this.state.roundAudio}>
                    <button className='games-page-wrap__game-wrap__audio-call__game__repeat__button sound-button'>
                      Повторить
                    </button>
                  </Music>
                </div>
                <div className={this.state.nextRoundBUttonWrapClass}>
                  <Music
                    className=''
                    url={this.state.roundAudio}>
                    <button className={this.state.nextRoundButtonCLass}
                      onClick={(e) => { this.nextRoundOnClick(e) }}>
                      {this.state.nextRoundBUttonText}
                    </button>
                  </Music>
                </div>
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
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}>{this.state.currentButtonText_2}
                  </button>

                  <button
                    className={this.state.currentButClassName}
                    style={this.state.currentButtonActive_2}
                    data-index='2'
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}>{this.state.currentButtonText_3}
                  </button>

                  <button
                    className={this.state.currentButClassName}
                    style={this.state.currentButtonActive_3}
                    data-index='3'
                    onClick={(e) => { this.getButtonDatatypeOnClick(e) }}>{this.state.currentButtonText_4}
                  </button>

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