import React from 'react';
import logo from '../../../img/logo.svg';
import './Logo.scss';

class Logo extends React.Component {
  render() {
    return (
      <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a>
    );
  }
}

export { Logo };