import React from 'react';
import './soundview.scss';

type SoundviewProps = {
  style: { display: string },
}

class Soundview extends React.Component {
  render() {
    return (
      <div className="sound-view">
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
        <div className="sound-view__line"></div>
      </div>
    )

  }

}

export { Soundview };