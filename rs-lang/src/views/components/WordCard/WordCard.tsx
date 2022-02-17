import React from 'react';
import { newDataService } from '../../../dataServer/dataService';
import { WordCardProps } from '../../../interfaces/types';
import CARD_BUTTONS_W from '../CardButton/CardButtons';
// import { CardButtons } from '../CardButton/CardButtons'; 
import './WordCard.scss';

class WordCard extends React.Component<WordCardProps> {
  baseURL: string;

  constructor(props: WordCardProps) {
    super(props);
    this.baseURL = newDataService.baseURL + '/';
  }

  render() {
    const arrUrls = [this.props.word.audio, this.props.word.audioMeaning, this.props.word.audioExample];
    return (
      <div className="word-card">
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
        <CARD_BUTTONS_W soundUrls={arrUrls} isAutorize={false} wordId={this.props.word.id}/>
      </div>
    );
  }    
}

export { WordCard };
