
interface IAudioCallWords {
  word: string;
  iconURL: string;
  soundURL: string,
}

class AudioCallGameModel {
  words: IAudioCallWords[];

  isSetting = true;

  constructor(words: IAudioCallWords[]) {
    this.words = words;
  }
}

export { AudioCallGameModel };