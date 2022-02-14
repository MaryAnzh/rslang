import React from 'react';

type HeardsErrorProps = {
  heardFill: string,
  heardStroke: string,
}

class HeardsError extends React.Component<HeardsErrorProps> {
  render() {
    return (
      <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
        x="0px" y="0px" viewBox="0 0 21 16.35" >
        <path fill={this.props.heardFill} stroke={this.props.heardStroke} stroke-miterlimit="10" d="M20.28,4.7c-0.54-1.79-2.33-3.81-4.97-3.99
	c-0.12-0.01-0.25-0.01-0.38-0.01c-1.73,0-3.36,0.81-4.44,2.19C9.9,2.1,8.46,0.58,6.22,0.5c-0.06,0-0.11,0-0.17,0
	c-2.7,0-4.73,2.11-5.34,4.2C0.15,6.6,0.84,8.22,1.17,9c1.07,2.52,3.65,4.43,8.92,6.58l0.03,0.02l0.23,0.19l0.29-0.1
	c0.09-0.03,0.16-0.06,0.21-0.09c5.3-2.15,7.9-4.06,8.96-6.59C20.16,8.21,20.85,6.57,20.28,4.7z"/>
      </svg>

    );
  }
}

export { HeardsError };