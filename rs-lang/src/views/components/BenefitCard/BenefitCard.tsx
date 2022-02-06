import React from 'react';
import './BenefitCard.scss';

type BenefitType = {
  url: string;
  title: string;
  text: string;
}

class BenefitCard extends React.Component<BenefitType> {
  render() {
    return (
      <div className="benefit-card">
        <img className="benefit-card__icon" src={this.props.url} alt="icon" />
        <div className="benefit-card__wrapper">
          <h3 className='benefit-card__title'>{this.props.title}</h3>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}

export { BenefitCard };
