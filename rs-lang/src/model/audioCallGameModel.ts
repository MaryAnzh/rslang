
interface IAudioCallWords {
  word: string;
  iconURL: string;
  soundURL:string,
}

class AudioCallGameModel {
  words: IAudioCallWords[];
  
  constructor(words: IAudioCallWords[]) {
    this.words = words;
}
}

export { AudioCallGameModel };