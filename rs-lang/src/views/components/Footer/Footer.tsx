import React from 'react';
import logoSchool from '../../../img/rs_school_js.svg';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <a href="https://rs.school/">
          <img src={logoSchool} className="footer__logo" alt="logo"/>
        </a>
        <ul className="footer__links">
          <li>
            <a className="link footer__link" href="https://github.com/MaryAnzh">Maryia Vashchayeva</a>
          </li>
          <li>
            <a className="link footer__link" href="https://github.com/mayerror">Sergey Masiuk</a>
          </li>
        </ul>
        <p className="footer__copyright">&copy; 2022, RSLang</p>
      </footer>
    );
  }    
}

export { Footer };
