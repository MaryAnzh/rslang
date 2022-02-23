import { IAudioCallWords, IAnxwer, ISprintRoundWords } from '../interfaces/wordsInterface';
import { WordCardType } from '../interfaces/types';

class AudioCallGameModel {
  currentWordsArray: WordCardType[];

  currentWordsArrayLangth: number;

  //массив слоа раунда
  roundWordsArray: IAnxwer[];

  currentShuffleWords: string[];

  sprintRoundWordsArray: ISprintRoundWords[];

  roundAUdio: string;

  roundImg: string;

  roundOnClickButtonNumber = 0;

  serverURL = 'https://react-rslang-team-mary.herokuapp.com';

  currentLevelNumber = 0;

  currrntPageNumber = 0;

  //номер индекса слова раунда
  itemIndex = 0;

  //номер текущего раунда
  currentRound = 1;

  trueRoundWord = '';

  currentTrueWordEng = '';

  errorAnxwerCount = 0;

  currentTrueWordId = '';

  roundTrueAnswer = 0;

  constructor(currentWordsArray: WordCardType[]) {
    this.currentWordsArray = currentWordsArray;
    this.currentWordsArrayLangth = this.currentWordsArray.length;
    this.roundWordsArray = [];
    this.sprintRoundWordsArray = [];
    this.currentShuffleWords = this.createCurrentShuffleWords();
    this.roundAUdio = '';
    this.roundImg = '';
  }

  createCurrentShuffleWords() {
    const array: string[] = [];
    this.currentWordsArray.forEach((elem) => {
      array.push(elem.wordTranslate);
    })
    return array;
  }

  roundWords() {
    // console.log(this.currentWordsArray[this.itemIndex].id);
    const roundArray: IAnxwer[] = [];
    const wordEng = this.currentWordsArray[this.itemIndex].word;
    // console.log('Правильное слово');
    // console.log(this.currentWordsArray[this.itemIndex].word);
    const wordId = this.currentWordsArray[this.itemIndex].id;
    this.currentTrueWordId = wordId;
    // console.log('id');
    // console.log(this.currentWordsArray[this.itemIndex].id);

    const currentRoundWord = this.currentWordsArray[this.itemIndex].wordTranslate;
    // console.log('Правильное слово перевод');
    // console.log(this.currentWordsArray[this.itemIndex].wordTranslate);


    this.currentTrueWordEng = wordEng;
    this.trueRoundWord = `${wordEng} -- ${this.currentWordsArray[this.itemIndex].wordTranslate}`;
    const trueWord: IAnxwer = {
      word: currentRoundWord,
      isTrueAnxwer: true,
    };
    const audio = this.currentWordsArray[this.itemIndex].audio;
    const img = this.currentWordsArray[this.itemIndex].image;
    this.roundAUdio = `${this.serverURL}/${audio}`;
    this.roundImg = `${this.serverURL}/${img}`;
    roundArray.push(trueWord);

    const falseWords = [...this.currentShuffleWords];
    falseWords.splice(this.itemIndex, 1);
    this.shuffle(falseWords);

    const falseWordsNumber = 3;
    for (let i = 0; i < falseWordsNumber; i++) {
      const falseWord: IAnxwer = {
        word: falseWords[i],
        isTrueAnxwer: false,
      }
      roundArray.push(falseWord);
    }

    this.shuffle(roundArray);
    this.roundWordsArray = roundArray;
    return roundArray;
  }

  sprintRoundWords() {
    const roundArray: ISprintRoundWords[] = [];
    if (this.itemIndex > this.currentWordsArrayLangth - 1) {
      this.itemIndex = 0;
    }
    const wordEng = this.currentWordsArray[this.itemIndex].word;
    const wordRus = this.currentWordsArray[this.itemIndex].wordTranslate;

    const trueWord: ISprintRoundWords = {
      word: wordEng,
      translate: wordRus,
      isTrueAnxwer: true,
    };

    const audio = this.currentWordsArray[this.itemIndex].audio;
    const img = this.currentWordsArray[this.itemIndex].image;
    this.roundAUdio = `${this.serverURL}/${audio}`;
    this.roundImg = `${this.serverURL}/${img}`;
    roundArray.push(trueWord);

    const falseWords = [...this.currentShuffleWords];
    falseWords.splice(this.itemIndex, 1);
    this.shuffle(falseWords);

    const falseWord: ISprintRoundWords = {
      word: wordEng,
      translate: falseWords[0],
      isTrueAnxwer: false,
    }
    roundArray.push(falseWord);


    this.shuffle(roundArray);
    this.sprintRoundWordsArray = roundArray;
    return roundArray;
  }

  shuffle<T>(array: Array<T>) {
    return array.sort(() => Math.random() - 0.5);
  }

  rendomNumber(digitRange: number) {
    const randomArr = [];
    //массив начинаетмся с 0
    for (let i = 0; i < digitRange; i += 1) {
      randomArr.push(i);
    }

    this.shuffle(randomArr);

    return randomArr[1];
  }

  isAnswerTrue(answerNumber: number): boolean {
    this.roundOnClickButtonNumber = answerNumber;
    return this.roundWordsArray[answerNumber].isTrueAnxwer;
  }
}

export { AudioCallGameModel };