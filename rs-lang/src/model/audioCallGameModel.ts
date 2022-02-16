import { IAudioCallWords, IAnxwer } from '../interfaces/wordsInterface';
import { wordsArray } from './gamaTesting';

class AudioCallGameModel {
  currenwordsArray: IAudioCallWords[];

  isSetting: boolean;

  currentWordsArrayLangth: number;

  //номер текущего раунда
  currentRound: number;

  //массив слоа раунда
  roundWordsArray: IAudioCallWords[];

  constructor(currenwordsArray: IAudioCallWords[]) {
    this.currenwordsArray = currenwordsArray;
    this.isSetting = true;
    this.currentWordsArrayLangth = this.currenwordsArray.length;
    this.currentRound = 1;
    this.roundWordsArray = [];
  }

  roundWords() {
    const roundArray: IAnxwer[] = [];
    const trueWord: IAnxwer = {
      word: this.currenwordsArray[this.currentRound - 1].word,
      trueAnxwer: true,
    };
    const falseWordsNumber = 3;
    for (let index = 0; index < falseWordsNumber; index += 1) {
      let randomIndex = this.rendomNumber(this.currentWordsArrayLangth);
      let falseWord = this.currenwordsArray[randomIndex].word;
      let check = this.currenwordsArray.findIndex((elem, i) => {
        if (elem.word == falseWord) {
          return i;
        }
        return -1;
      });
      
    }
  }

  shuffle(array: Array<number>) {
    array.sort(() => Math.random() - 0.5);
  }

  rendomNumber(digitRange: number) {
    const randomArr = [];
    for (let i = 0; i < digitRange; i = + 1) {
      randomArr.push(i);
    }

    this.shuffle(randomArr);
    return randomArr[1];
  }

}
const a = wordsArray;
const test = new AudioCallGameModel(a);
console.log('Тестирование');
console.log(test.currentWordsArrayLangth);
export { AudioCallGameModel };