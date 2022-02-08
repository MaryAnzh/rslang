export type CardType = {
  url: string;
  title: string;
  text: string;
  github?: string;
}

export type WordCardType = {
  word: {
    id: string;
    group: string;
    page: string;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
  }
}