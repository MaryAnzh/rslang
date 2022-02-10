import { newDataService } from '../dataServer/dataService';

class SoundModel {
  records: string[];

  baseURL: string;

  audioArr: HTMLAudioElement[] | undefined;

  constructor() {
    this.baseURL = newDataService.baseURL + '/';
    this.records = [];
  }

  async play(arr: string[]) {
    this.records = arr;
    this.audioArr = this.records.map(url => {
      return new Audio(this.baseURL + url);
    });
    await this.playAudio(this.audioArr[0]);
    await this.playAudio(this.audioArr[1]);
    await this.playAudio(this.audioArr[2]);
  }

  playAudio(audio: HTMLAudioElement){
    return new Promise(res=>{
      audio.play();
      audio.onended = res;
    });
  }

  stop() {
    if (this.audioArr?.length) {
      this.audioArr.forEach(audio => audio.pause());
    }
  }
}

const soundModel = new SoundModel();

export { soundModel };