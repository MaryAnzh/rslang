import { IAudioCallWords, IAnxwer } from '../interfaces/wordsInterface';
import { wordsArray } from './gamaTesting';

class AudioCallGameModel {
  currentWordsArray: IAudioCallWords[];

  isSetting: boolean;

  currentWordsArrayLangth: number;

  //номер текущего раунда
  currentRound: number;

  //массив слоа раунда
  roundWordsArray: IAudioCallWords[];

  constructor(currentWordsArray: IAudioCallWords[]) {
    this.currentWordsArray = currentWordsArray;
    this.isSetting = false;
    this.currentWordsArrayLangth = this.currentWordsArray.length;
    this.currentRound = 1;
    this.roundWordsArray = [];
  }

  roundWords() {
    const roundArray: IAnxwer[] = [];
    const trueWord: IAnxwer = {
      word: this.currentWordsArray[this.currentRound - 1].word,
      trueAnxwer: true,
    };
    const falseWordsNumber = 3;
    for (let i = 0; i < falseWordsNumber; i++) {
      //let randomIndex = this.rendomNumber(this.currentWordsArrayLangth);
      
      console.log(i);
    //   console.log('randomIndex');
    //   console.log(randomIndex);
    }
    
    return '1111';
    
    // for (let index = 0; index < falseWordsNumber; index += 1) {
    //   let randomIndex = this.rendomNumber(this.currentWordsArrayLangth);
    //   console.log('randomIndex');
    //   console.log(randomIndex);
    //   let falseWord = this.currentWordsArray[randomIndex].word;
    //   console.log('falseWord');
    //   console.log(falseWord);
    //   let check = this.currentWordsArray.findIndex((elem, i) => {
    //     if (elem.word == falseWord) {
    //       return i;
    //     }
    //     return -1;
    //   });
    //   console.log('check');
    //   console.log(check);
    // }
  }

  shuffle(array: Array<number>) {
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

}
const a = wordsArray;
const test = new AudioCallGameModel(a);
console.log('Тестирование');
console.log(test.rendomNumber(5));
export { AudioCallGameModel };