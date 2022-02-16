import { IAudioCallWords, IAnxwer } from '../interfaces/wordsInterface';
import { wordsArray } from './gamaTesting';

class AudioCallGameModel {
  currentWordsArray: IAudioCallWords[];

  isSetting: boolean;

  currentWordsArrayLangth: number;

  //номер текущего раунда
  currentRound: number;

  //массив слоа раунда
  roundWordsArray: IAnxwer[];

  currentShuffleWords: string[];

  constructor(currentWordsArray: IAudioCallWords[]) {
    this.currentWordsArray = currentWordsArray;
    this.isSetting = true;
    this.currentWordsArrayLangth = this.currentWordsArray.length;
    this.currentRound = 1;
    this.roundWordsArray = [];
    this.currentShuffleWords = this.createCurrentShuffleWords();
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
    const trueWordIndex = this.currentRound - 1;
    const trueWord: IAnxwer = {
      word: this.currentWordsArray[trueWordIndex].word,
      trueAnxwer: true,
    };
    roundArray.push(trueWord);

    const falseWords = [...this.currentShuffleWords];
    falseWords.splice(trueWordIndex, 1);
    this.shuffle(falseWords);
    
    const falseWordsNumber = 3;
    for (let i = 0; i < falseWordsNumber; i++) {
      const falseWord: IAnxwer = {
        word: falseWords[i],
        trueAnxwer: false,
      } 
      roundArray.push(falseWord);
    }

    this.shuffle(roundArray);
    this.roundWordsArray = roundArray;
    return roundArray;
  }

  shuffle(array: Array<number | string | object>) {
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
console.log(test.roundWords());
export { AudioCallGameModel };