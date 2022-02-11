import React from 'react';
import './alert.scss';
import { AppProperties } from '../../../interfaces/appProperties';
import { CrossUpDate } from '../crossUpDate/crossUpDate'

type AlertType = {
  alertTwxt: string;
  alertStyle: { display: string, };
}

class Alert extends React.Component<AlertType> {
  render() {
    return (
      <div
        className='alert'
        style={this.props.alertStyle }>
        {/* //<CrossUpDate crossId='cross-alert' /> */}
        <p className='alert__text'> {this.props.alertTwxt} </p>
      </div>
    );
  }
}

export { Alert };