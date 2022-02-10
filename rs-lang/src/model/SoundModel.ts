import { newDataService } from '../dataServer/dataService';

class SoundModel {
  baseURL: string;

  isPlay: boolean;

  audioArr: HTMLAudioElement[] | undefined;

  constructor() {
    this.baseURL = newDataService.baseURL + '/';
    this.isPlay = false;
  }

  async play(arr: string[]) {
    this.isPlay = true;
    this.audioArr = arr.map(url => {
      return new Audio(this.baseURL + url);
    });
    await this.playAudio(this.audioArr[0]);
    await this.playAudio(this.audioArr[1]);
    await this.playAudio(this.audioArr[2]);
    this.isPlay = false;
  }

  playAudio(audio: HTMLAudioElement){
    return new Promise(res=>{
      audio.play();
      audio.onended = res;
    });
  }

  stop() {
    if (this.isPlay) {
      this.isPlay = false;
      if (this.audioArr?.length) {
        this.audioArr.forEach(audio => audio.pause());
      }
    }
  }
}

const soundModel = new SoundModel();

export { soundModel };