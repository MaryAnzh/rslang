import React from 'react';
import { ResponseProgressBody } from '../../../interfaces/types';
import { userStorage } from '../../../model/UserStorage';
import './ProgressPopup.scss';

class ProgressPopup extends React.Component<{ wordId: string }> {
  state: { word: ResponseProgressBody; };

  constructor(props: { wordId: string }) {
    super(props);
    this.state = {
      word: {
        difficulty: 'new', 
        wordId: '',
        optional: {
          sprint: {
            right: 0,
            wrong: 0,
          },
          audio: {
            right: 0,
            wrong: 0,
          },
        },
      },
    };
  }

  async componentDidMount() {
    const word = await userStorage.getProgressWord(this.props.wordId);
    if (word) {
      this.setState( { word: word } );
    }
  }

  render() {
    return (
      <div className='progress-popup progress-popup_active'>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>Верно</th>
            <th>Неверно</th>
          </tr>
          <tr>
            <td>Спринт</td>
            <td className='progress-popup__td_center'>{this.state.word.optional.sprint.right}</td>
            <td className='progress-popup__td_center'>{this.state.word.optional.sprint.wrong}</td>
          </tr>
          <tr>
            <td>Аудиовызов</td>
            <td className='progress-popup__td_center'>{this.state.word.optional.audio.right}</td>
            <td className='progress-popup__td_center'>{this.state.word.optional.audio.wrong}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export { ProgressPopup };