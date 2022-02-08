import React from 'react';
import { WordCardType } from '../../../interfaces/types';
import './WordCard.scss';

class WordCard extends React.Component<WordCardType> {
  constructor(props) {
    super(props);
    this.baseURL = 'https://react-rslang-team-mary.herokuapp.com/';
  }

  render() {
    return (
      <div className="word-card">
        фывфывфывы
        <img className="word-card__picture" src={this.props.word.url} alt="icon" />
        <div className="word-card__wrapper">
          {/* <a href={this.props.word.github} className='person-card__title person-card__link'>{this.props.word.github?.slice(19)}</a>
          <p>{this.props.word.text}</p> */}
        </div>
      </div>
    );
  }    
}

export { WordCard };
