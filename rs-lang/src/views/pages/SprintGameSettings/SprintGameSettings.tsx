import React from 'react';
import './Games.scss';
import '../../elements/settingPanel/settingPanel';
import { audioCallPageModel } from '../../../model/AudioCallPageModel';
import { SettingPanel } from '../../elements/settingPanel/settingPanel';

class SprintGameSettings extends React.Component {
  render() {
    return (
      <main className="main">
        <div className='games-page-wrap'>
          <h1>И Г Р Ы</h1>
          <div className='games-page-wrap__games-wrap'>
            <SettingPanel />
            <div className='games-page-wrap__games-wrap__audio-call'>
              <h2>Игра</h2>
              <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
            </div>
          </div>
        </div>
      </main >
    );
  }
}

export { SprintGameSettings };