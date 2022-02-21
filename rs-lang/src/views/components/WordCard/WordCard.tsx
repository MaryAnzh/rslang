import React from 'react';
import { connect } from 'react-redux';
import { newDataService } from '../../../dataServer/dataService';
import { ButtonsGlobState, WordCardProps } from '../../../interfaces/types';
import CARD_BUTTONS_W from '../CardButton/CardButtons';
import './WordCard.scss';

const mapStateToProps = (state: ButtonsGlobState, ownProps: WordCardProps ) => {
  return {
    ...ownProps,
    hardsArray: state.glob.hardsArray,
    easyArray: state.glob.easyArray,
  }
};

type ArrayActionProps = {
  hardsArray?: string[],
  easyArray?: string[],
}

const connector = connect(mapStateToProps, null);


class WordCard extends React.Component<WordCardProps & ArrayActionProps> {
  baseURL: string;

  constructor(props: WordCardProps & ArrayActionProps) {
    super(props);
    this.baseURL = newDataService.baseURL + '/';
  }

  render() {
    let cardClassName: string;
    if (this.props.easyArray?.includes(this.props.word.id || this.props.word._id)) {
      cardClassName = 'word-card word-card_easy';
    } else {
      if (this.props.hardsArray?.includes(this.props.word.id || this.props.word._id)) {
        cardClassName = 'word-card word-card_hard';
      } else {
        cardClassName = 'word-card';
      }
    }
    
    const arrUrls = [this.props.word.audio, this.props.word.audioMeaning, this.props.word.audioExample];
    return (
      <div className={cardClassName}>
        <img className="word-card__picture" src={this.baseURL + this.props.word.image} alt="pic" />
        <div className="word-card__wrapper">
          <div className="word-card__word-container">
            <p className='word-card__text word-card__word'>{this.props.word.word} - {this.props.word.transcription}</p>
            <p className='word-card__text word-card__second-text'>{this.props.word.wordTranslate}</p>
          </div>
          <div className="word-card__example-container">
            <p className='word-card__text' dangerouslySetInnerHTML={{ __html: this.props.word.textMeaning }} />
            <p className='word-card__text word-card__second-text'>{this.props.word.textMeaningTranslate}</p>
          </div>
          <div className="word-card__example-container">
            <p className='word-card__text' dangerouslySetInnerHTML={{ __html: this.props.word.textExample }} />
            <p className='word-card__text word-card__second-text'>{this.props.word.textExampleTranslate}</p>
          </div>
        </div>
        <CARD_BUTTONS_W soundUrls={arrUrls} isAutorize={false} wordId={this.props.word.id || this.props.word._id}/>
      </div>
    );
  }    
}

// export { WordCard };
export default connector(WordCard);
