import React from 'react';
import './TextBook.scss';

class TextBook extends React.Component {
  render() {
    return (
      <main className="main">
        <h1>TextBook</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum temporibus, dolore dicta reprehenderit eos neque hic! Ipsum maxime nulla laborum mollitia dolorum animi ipsa voluptatum sapiente asperiores deleniti? Exercitationem, iusto!</p>
      </main>
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { TextBook };