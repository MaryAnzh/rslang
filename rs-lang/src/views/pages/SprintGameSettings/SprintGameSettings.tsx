import React from 'react';
import { Link } from 'react-router-dom';
import './SprintGameSettings.scss';
import '../../elements/settingPanel/settingPanel';
import { audioCallPageModel } from '../../../model/AudioCallPageModel';
import { SettingPanel } from '../../elements/settingPanel/settingPanel';
import { applicationModel } from '../../../model/ApplicationModel';

class SprintGameSettings extends React.Component {

  startGame(e: React.MouseEvent<HTMLElement>) {
    applicationModel.gameFromBook = false;
  }

  render() {
    return (
      <main className="main">
        <div className='games-page-wrap'>
          <h1>С П Р И Н Т</h1>
          <div className='games-page-wrap__games-wrap'>
            <SettingPanel />
            <div className='games-page-wrap__games-wrap__audio-call'>
              <h2>Спринт</h2>
              <Link
                onClick={(e) => { this.startGame(e) }}
                to="/sprint-game">
                <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
              </Link>

            </div>
          </div>
        </div>
      </main >
    );
  }
}

export { SprintGameSettings };