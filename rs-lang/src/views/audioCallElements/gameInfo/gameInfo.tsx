import React from 'react';
import './gameInfo.scss';

type GameInfoType = {
  gameInfoStyle: { display: string, };
}

class GameInfo extends React.Component<GameInfoType> {
  render() {
    return (
      <div
        className='game-info-wrap'
        style={this.props.gameInfoStyle}>
        <div className='game-info-wrap__info'>
          <div className='game-info-wrap__info__body'>
            {this.props.children}
          </div>          
        </div>
      </div>
    );
  }
}

export { GameInfo };