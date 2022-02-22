import React from 'react';
import './ProgressPopup.scss';

class ProgressPopup extends React.Component {
  render() {
    return (
      <div className='progress-popup progress-popup_active'>
        <table>
          <tr>
            <th></th>
            <th>Верно</th>
            <th>Неверно</th>
          </tr>
          <tr>
            <td>Спринт</td>
            <td className='progress-popup__td_center'>0</td>
            <td className='progress-popup__td_center'>0</td>
          </tr>
          <tr>
            <td>Аудиовызов</td>
            <td className='progress-popup__td_center'>0</td>
            <td className='progress-popup__td_center'>0</td>
          </tr>
        </table>
      </div>
    );
  }
}

export { ProgressPopup };