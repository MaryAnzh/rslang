import { MouseEventHandler } from 'react'

export type CardType = {
  url: string;
  title: string;
  text: string;
  github?: string;
}

export type WordCardType = {
  id: string;
  _id: string;
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
  isShowPopup: boolean,
}

export type CardButtonsProps = {
  soundUrls: string[];
  wordId: string;
  isAutorize?: boolean;
}

export type PaginationProps = {
  links: boolean;
  page: number;
  downHandler: MouseEventHandler<HTMLButtonElement>;
  upHandler: MouseEventHandler<HTMLButtonElement>;
  isAutorize?: boolean; 
  easyArray?: string[];
}

export type GroupPaginationProps = {
  groupHandler: Function;
  group: number;
  isAutorize?: boolean;
}

export type ButtonsGlobState = { 
  glob: { 
    isAutorize: boolean,
    hardsArray: string[],
    easyArray: string[],
    isGameLink: boolean;
  }
}

export type ActionType = { 
  type: string,
  value: boolean | string[],
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

export type ArrayActionProps = {
  hardsArray?: string[],
  easyArray?: string[],
}

export type ResponseProgressBody = {
  difficulty: string, 
  wordId: string,
  optional: {
    sprint: {
      right: number,
      wrong: number
    },
    audio: {
      right: number,
      wrong: number
    },
  },
}