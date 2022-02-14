import React from 'react';
import './AudioCallGame.scss';
import '../../elements/settingPanel/settingPanel';
import { audioCallPageModel } from '../../../model/AudioCallPageModel';
import { SettingPanel } from '../../elements/settingPanel/settingPanel';

class AudioCallGame extends React.Component {
  render() {
    if (audioCallPageModel.isSetting) {
      return (
        <main className="main">
          <div className='games-page-wrap'>
            <h1>А У Д И О  В Ы З О В</h1>
            <div className='games-page-wrap__games-wrap'>
              <SettingPanel />
              <div className='games-page-wrap__games-wrap__audio-call'>
                <h2>Аудиовызов</h2>
                <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
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
            <div className='games-page-wrap__games-wrap'>
              Game
            </div>
          </div>
        </main >
      );
    }
  }
}

export { AudioCallGame };