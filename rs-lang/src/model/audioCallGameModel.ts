import { IAudioCallWords } from '../interfaces/wordsInterface';

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
    this.currentRound = 0;
    this.roundWordsArray = [];
  }

  roundWords() {
    this.currentRound += 1;

  }

}

export { AudioCallGameModel };