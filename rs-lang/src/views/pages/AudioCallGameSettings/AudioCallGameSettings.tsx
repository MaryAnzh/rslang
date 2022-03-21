import React from 'react';
import { Link } from 'react-router-dom';
import './AudioCallGameSettings.scss';
import '../../elements/settingPanel/settingPanel';
import { audioCallPageModel } from '../../../model/AudioCallPageModel';
import { SettingPanel } from '../../elements/settingPanel/settingPanel';
import { applicationModel } from '../../../model/ApplicationModel';

class AudioCallGameSettings extends React.Component {

  startGameOnClick(e: React.MouseEvent<HTMLElement>) {
    audioCallPageModel.isSetting = false;
    this.forceUpdate();
  }

  startGame(e: React.MouseEvent<HTMLElement>) {
    applicationModel.gameFromBook = false;
  }

  render() {
    return (
      <main className="main">
        <div className='games-page-wrap'>
          <h1>А У Д И О  В Ы З О В</h1>
          <div className='games-page-wrap__settings-wrap'>
            <SettingPanel />
            <section className='games-page-wrap__settings-wrap__audio-call'>
              <h2>Аудиовызов</h2>
              <Link
                to="/audiocall-game"
                onClick={(e) => { this.startGame(e) }}>
                <button
                  className='games-page-wrap__settings-wrap__audio-call__game-start'>
                  Играть</button> </Link>

            </section>
          </div>
        </div>
      </main >
    );
  }
}

export { AudioCallGameSettings };