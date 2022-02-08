import React from 'react';
import './Footer.scss';

class WordCard extends React.Component {

  render() {
    return (
      <div className="word-card">
        {/* <img className="word-card__picture" src={this.props.url} alt="icon" />
        <div className="word-card__wrapper">
          <h3 className='word-card__title'>{this.props.title}</h3>
          <a href={this.props.github} className='person-card__title person-card__link'>{this.props.github?.slice(19)}</a>
          <p>{this.props.text}</p>
        </div> */}
      </div>
    );
  }    
}

export { WordCard };
