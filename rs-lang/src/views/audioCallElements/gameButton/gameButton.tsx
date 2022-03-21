import React from 'react';
import './gameButton.scss';

type GameButtonProps = {
  buttonText_1: string,
  buttonText_2: string,
  buttonText_3: string,
  buttonText_4: string,
}

class GameButton extends React.Component{
  render() {
    return (
      <div className="game-button-wrap">
        {this.props.children}
      </div>
    )
  }
}

export { GameButton };