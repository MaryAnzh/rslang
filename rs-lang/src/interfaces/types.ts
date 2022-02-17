import { MouseEventHandler } from 'react'

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
  userWord?: { difficulty: string }
}

export type WordCardProps = {
  word: WordCardType;
}

export type TextBookState = {
  words: WordCardType[];
  page: number;
  group: number;
}

export type CardButtonsState = {
  isPlay: boolean;
}

export type CardButtonsProps = {
  soundUrls: string[];
  wordId: string;
  isAutorize?: boolean;
}

export type PaginationProps = {
  page: number;
  downHandler: MouseEventHandler<HTMLButtonElement>;
  upHandler: MouseEventHandler<HTMLButtonElement>;
  isAutorize?: boolean; 
}

export type GroupPaginationProps = {
  groupHandler: Function;
  group: number;
  isAutorize?: boolean;
}

export type ButtonsGlobState = { 
  buttons: { isAutorize: boolean }
}

export type ActionType = { 
  type: string,
  value: boolean
} 

export type RequestWordBody = {
  difficulty: string, 
  optional?: {}, 
}

export type RequestWord = RequestWordBody & {
  id: string,
  wordId: string,
}

export type PaginatedResults = {
  paginatedResults: WordCardType[],
  totalCount: { count: string, }[],
}
