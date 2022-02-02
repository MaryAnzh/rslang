import React from 'react';
import logo from '../../img/logo.svg';
import '../../css/header.css';
import { render } from '@testing-library/react';

// function Header() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="header-logo" alt="logo" />
        <ul className="header-nav">
          <li>Главная</li>
          <li>Учебник</li>
          <li>Игры</li>
          <li>О команде</li>
        </ul>
      </header>

    );
  }
}
//экспорт для функции
//export default Header
export { Header };
