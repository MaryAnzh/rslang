
interface IAudioCallWords {
  word: string;
  iconURL: string;
  soundURL:string,
}

class AudioCallGameModel {
  words: IAudioCallWords[];

  isSetting = false;

  isGame = false;
  
  constructor(words: IAudioCallWords[]) {
    this.words = words;
}
}

export { AudioCallGameModel };