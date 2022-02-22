import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/logo.svg';
import './Logo.scss';

class Logo extends React.Component<{ funCall: Function }> {
  render() {
    return (
      <Link to="/" onClick={() => this.props.funCall() }>
        <img src={logo} className="logo" alt="logo" />
      </Link>
    );
  }
}

export { Logo };