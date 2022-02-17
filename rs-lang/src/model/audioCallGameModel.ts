import { IAudioCallWords, IAnxwer } from '../interfaces/wordsInterface';
import { applicationModel } from './ApplicationModel';
import { WordCardType } from '../interfaces/types';

class AudioCallGameModel {
  currentWordsArray: WordCardType[];

  serverURL: string;

  itemIndex: number;

  currentWordsArrayLangth: number;

  //номер текущего раунда
  currentRound: number;

  //массив слоа раунда
  roundWordsArray: IAnxwer[];

  currentShuffleWords: string[];

  roundAUdio: string;

  roundImg: string;

  currentLevel = 0;

  currrntPageNumber = 0;

  roundOnClickButtonNumber = 0;

  constructor(currentWordsArray: WordCardType[]) {
    this.currentWordsArray = currentWordsArray;
    this.serverURL = 'https://react-rslang-team-mary.herokuapp.com';
    this.itemIndex = 0;
    this.currentWordsArrayLangth = this.currentWordsArray.length;
    this.currentRound = 1;
    this.roundWordsArray = [];
    this.currentShuffleWords = this.createCurrentShuffleWords();
    this.roundAUdio = '';
    this.roundImg = '';
  }

  createCurrentShuffleWords() {
    const array: string[] = [];
    this.currentWordsArray.forEach((elem) => {
      array.push(elem.word);
    })
    return array;
  }

  roundWords() {
    const roundArray: IAnxwer[] = [];
    const trueWordIndex = this.itemIndex;
    const trueWord: IAnxwer = {
      word: this.currentWordsArray[trueWordIndex].word,
      isTrueAnxwer: true,
    };
    const audio = this.currentWordsArray[trueWordIndex].audio;
    const img = this.currentWordsArray[trueWordIndex].image;
    this.roundAUdio = `${this.serverURL}/${audio}`;
    this.roundImg = `${this.serverURL}/${img}`;
    roundArray.push(trueWord);

    const falseWords = [...this.currentShuffleWords];
    falseWords.splice(trueWordIndex, 1);
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

async function word() {
  const a = await applicationModel.getWords(0, 0);
  if (a != undefined) {
    const w = new AudioCallGameModel(a);
    const c = w.roundWords();

    // console.log('w.currentLevel');
    // console.log(c);
  }
}
word();

export { AudioCallGameModel };