import React, { Component } from 'react'

type MusicState = {
  play: boolean,
  pause: boolean,
}

type MusicProps = {
  url: string,
  className: string,
}

class Music extends React.Component<MusicProps> {
  url: string;

  audio: HTMLAudioElement;

  state: MusicState;
  
  constructor(props: MusicProps) {
    super(props);

    this.state = {
      play: true,
      pause: false,
    };

    this.url = this.props.url;
    this.audio = new Audio(this.url);

  }

  play() {
    this.setState({
      play: true,
      pause: false,
    });
    console.log(this.audio);
    this.audio.play();
  }

  pause() {
    this.setState({ play: false, pause: true });
    this.audio.pause();
  }

  render() {

    return (
      <div>
        <div onClick={() => this.play()}>{ this.props.children}</div>
        <div onClick={() => this.pause()}></div>
      </div>
    );
  }
}


export { Music };