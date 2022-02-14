import React from 'react';
import './Games.scss';
import '../../elements/settingPanel/settingPanel';
import { SettingPanel } from '../../elements/settingPanel/settingPanel';

class Games extends React.Component {
  render() {
    return (
      <main className="main">
        <div className='games-page-wrap'>
          <h1>И г р ы</h1>
          <div className='games-page-wrap__games-wrap'>
            <SettingPanel />
            <div className='games-page-wrap__games-wrap__audio-call'>
              <h2>Аудиовызов</h2>
              <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
            </div>
            {/* <div className='games-page-wrap__games-wrap__sprint'>
              <h2>Спринт</h2>
              <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
            </div> */}
          </div>
        </div>
      </main >
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { Games };