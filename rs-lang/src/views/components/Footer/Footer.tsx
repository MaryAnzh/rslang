import React from 'react';
// import logoSchool from '../../../img/rs_school_js.svg';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <a href="https://rs.school/">
          <img src='https://raw.githubusercontent.com/MaryAnzh/rslang-assets/61538a7429ec8a4b3eeab95ff3e595de36afad43/assets/svg/rs_school_white.svg'
          className="footer__logo" alt="logo" />
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
