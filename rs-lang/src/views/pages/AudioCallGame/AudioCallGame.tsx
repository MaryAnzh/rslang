import React from 'react';
import './AudioCallGame.scss';
import '../../elements/settingPanel/settingPanel';
import { audioCallPageModel } from '../../../model/AudioCallPageModel';
import { SettingPanel } from '../../elements/settingPanel/settingPanel';
import { CrossUpDate } from '../../elements/crossUpDate/crossUpDate';
import { HeardsError } from '../../audioCallElements/heardsErrior/heardsError';

type AudioCallGameType = {
  heardFill: string,
  heardStroke: string,
}

class AudioCallGame extends React.Component {
  state: AudioCallGameType;

  constructor(props: {}) {
    super(props);
    this.state = {
      heardFill: '#000000',
      heardStroke: '#000000',
    }
  }

  render() {
    if (audioCallPageModel.isSetting) {
      return (
        <main className="main">
          <div className='games-page-wrap'>
            <h1>А У Д И О  В Ы З О В</h1>
            <div className='games-page-wrap__settings-wrap'>
              <SettingPanel />
              <div className='games-page-wrap__settings-wrap__audio-call'>
                <h2>Аудиовызов</h2>
                <div
                  className='games-page-wrap__settings-wrap__audio-call__game-start'
                  onClick={(e) => { this.startGameOnClick(e) }} >Играть</div>
              </div>
            </div>
          </div>
        </main >
      );
    } else {
      return (
        <main className="main">
          <div className='games-page-wrap'>
            <h1>А У Д И О  В Ы З О В</h1>
            <div className='games-page-wrap__game-wrap'>
              <div
                className='games-page-wrap__game-wrap__cross'
                onClick={(e) => { this.closeGameOnClick(e) }}>
                <CrossUpDate crossId='audio-game-cross' />
              </div>
              <div className='games-page-wrap__game-wrap__audio-call'>
                <div className='games-page-wrap__game-wrap__audio-call__heards-error'>
                  <HeardsError heardFill={this.state.heardFill} heardStroke={this.state.heardStroke} />
                  <HeardsError heardFill={this.state.heardFill} heardStroke={this.state.heardStroke} />
                  <HeardsError heardFill={this.state.heardFill} heardStroke={this.state.heardStroke} />
                  <HeardsError heardFill={this.state.heardFill} heardStroke={this.state.heardStroke} />
                  <HeardsError heardFill={this.state.heardFill} heardStroke={this.state.heardStroke} />
                  
                </div>

              </div>
            </div>
          </div>
        </main >
      );
    }
  }

  startGameOnClick(e: React.MouseEvent<HTMLElement>) {
    audioCallPageModel.isSetting = false;
    this.forceUpdate();
  }

  closeGameOnClick(e: React.MouseEvent<HTMLElement>) {
    audioCallPageModel.isSetting = true;
    this.forceUpdate();
  }
}

export { AudioCallGame };