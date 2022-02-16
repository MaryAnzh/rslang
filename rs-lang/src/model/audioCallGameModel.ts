import { IAudioCallWords } from '../interfaces/wordsInterface';

class AudioCallGameModel {
  wordsArray: IAudioCallWords[];

  isSetting = true;

  constructor(wordsArray: IAudioCallWords[]) {
    this.wordsArray = wordsArray;
  }

}

export { AudioCallGameModel };