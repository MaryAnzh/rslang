import React from 'react';
import { CardType } from '../../../interfaces/types';
import './PersonCard.scss';


class PersonCard extends React.Component<CardType> {
  render() {
    return (
      <div className="person-card">
        <img className="person-card__icon" src={this.props.url} alt="icon" />
        <div className="person-card__wrapper">
          <h3 className='person-card__title'>{this.props.title}</h3>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}

export { PersonCard };
