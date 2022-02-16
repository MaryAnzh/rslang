import { IAudioCallWords, IAnxwer } from '../interfaces/wordsInterface';

class AudioCallGameModel {
  wordsArray: IAudioCallWords[];

  isSetting: boolean;

  currentWordsArrayLangth: number;

  //номер текущего раунда
  currentRound: number;

  //массив слоа раунда
  roundWordsArray: IAudioCallWords[];

  constructor(wordsArray: IAudioCallWords[]) {
    this.wordsArray = wordsArray;
    this.isSetting = true;
    this.currentWordsArrayLangth = this.wordsArray.length;
    this.currentRound = 1;
    this.roundWordsArray = [];
  }

  roundWords() {
    const roundArray: IAnxwer[] = [];
    const trueWord: IAnxwer = {
      word: this.wordsArray[this.currentRound - 1].word,
      trueAnxwer: true,
    };
    const falseWordsNumber = 3;
    // for (let index = 0; index < falseWordsNumber; index += 1) {
      
    // }
  }

  rendomNumber(digitRange: number) {
    function shuffle(array: Array<number>) {
      array.sort(() => Math.random() - 0.5);
    }
    const randomArr = [];
    for (let i = 1; i <= digitRange; i =+ 1) {
      randomArr.push(i);
    }
    shuffle(randomArr);
    return randomArr[1];
  }

}

export { AudioCallGameModel };