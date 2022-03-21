import { IAudioCallWords } from '../interfaces/wordsInterface';

const url = 'https://react-rslang-team-mary.herokuapp.com/files/01_0002_meaning.mp3';

export const wordsArray: IAudioCallWords[] = [
  {
    word: 'alcohol',
    iconURL: `${url}/files/01_0002.jpg`,
    soundURL: `${url}/files/01_0002.mp3"`,
  },
  {
    word: 'boat',
    iconURL: `${url}/files/01_0005.jpg`,
    soundURL: `${url}/files/01_0005.mp3"`,
  },
  {
    word: 'agree',
    iconURL: `${url}/files/01_0001.jpg`,
    soundURL: `${url}/files/01_0001.mp3"`,
  },
  {
    word: 'arrive',
    iconURL: `${url}/files/01_0003.jpg`,
    soundURL: `${url}/files/01_0003.mp3"`,
  },
  {
    word: 'August',
    iconURL: `${url}/files/01_0004.jpg`,
    soundURL: `${url}/files/01_0004.mp3"`,
  },
];
