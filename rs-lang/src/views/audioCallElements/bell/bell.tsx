import React from 'react';

type BellProps = {
  bellFill: string,
  hellStroke: string,
  bellWidth: string,
}

class BellSVG extends React.Component<BellProps> {
  render() {
    return (
      <svg version="1.1" baseProfile="tiny" id="bell" xmlns="http://www.w3.org/2000/svg"
        x="0px" y="0px" viewBox="0 0 19.38 25.26" width={this.props.bellWidth} >
        <path fill={this.props.bellFill} stroke={this.props.hellStroke} d="M18.75,18.32c-0.57-0.96-1.06-1.96-1.38-3.04c-0.71-2.37-0.16-4.78-0.62-7.18
	c-0.32-1.66-0.92-3.23-2.18-4.41c-0.56-0.53-1.21-0.86-1.87-1.23c-0.54-0.31-0.47-0.32-0.71-0.87c-0.32-0.71-0.97-1.27-1.73-1.47
	c0.21,0.06,0.04,0.01-0.07-0.02c0,0,0,0,0,0C10.12,0.09,9.74,0.02,9.73,0C9.07,0.12,8.44,0.34,7.97,0.84C7.5,1.31,7.43,2,6.96,2.35
	c-0.79,0.6-1.67,0.85-2.39,1.61c-1.82,1.92-2.28,4.9-2.13,7.45c0.16,2.69-0.75,4.93-2.06,7.28c-1.08,1.94,1.62,2.59,3.13,2.94
	c1.2,0.28,2.43,0.46,3.67,0.56c-0.03,0.16-0.05,0.33-0.05,0.52c0,3.29,5.11,3.29,5.11,0c0-0.19-0.02-0.36-0.05-0.53
	c0.44-0.04,0.88-0.08,1.31-0.13c1.48-0.17,5.08-0.45,5.81-2.15C19.56,19.32,19.02,18.77,18.75,18.32z M9.72,0.06
	C9.46,0.06,9.73,0.01,9.72,0.06L9.72,0.06z"/>
      </svg>

    );
  }
}

export { BellSVG };