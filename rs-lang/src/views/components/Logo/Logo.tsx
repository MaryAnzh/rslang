import React from 'react';
import logo from '../../../img/logo.svg';
import './Logo.scss';

class Logo extends React.Component {
  render() {
    return (
      <img src={logo} className="logo" alt="logo" />
    );
  }
}

export { Logo };