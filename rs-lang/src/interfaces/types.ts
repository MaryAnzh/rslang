export type CardType = {
  url: string;
  title: string;
  text: string;
  github?: string;
}

export type WordCardType = {
  id: string;
  group: number;
  page: number;
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

export type WordCardProps = {
  word: WordCardType;
}

export type TextBookState = {
  words: WordCardType[];
}

export type CardButtonsState = {
  isPlay: boolean;
}

export type CardButtonsProps = {
  soundUrls: string[];
}