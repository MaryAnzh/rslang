import React, { CSSProperties, ReactElement } from 'react';
import './settingPanel.scss';
import { applicationModel } from '../../../model/ApplicationModel';

class SettingPanel extends React.Component {
  render(): React.ReactNode {
    let userClass = applicationModel.isAuthorization ? 'setting__sections__section' : 'setting__sections__section blocked';
    return (
      <div className='setting'>
        <div className='setting__sections'>
          <div className='setting__sections__section'>Уровень сложности 1</div>
          <div className='setting__sections__section'>Уровень сложности 2</div>
          <div className='setting__sections__section'>Уровень сложности 3</div>
          <div className='setting__sections__section'>Уровень сложности 4</div>
          <div className='setting__sections__section'>Уровень сложности 5</div>
          <div className='setting__sections__section'>Уровень сложности 6</div>
          <div className={userClass}>Сложные слова</div>
        </div>
      </div>
    )
  }
}

export { SettingPanel };