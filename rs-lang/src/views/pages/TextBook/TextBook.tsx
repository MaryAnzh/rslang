import React from 'react';
import './TextBook.scss';

class TextBook extends React.Component {
  render() {
    return (
      <main className="main">
        <div className='book-wrap'>
          <h1>У ч е б н и к</h1>
          <div className='book-wrap__book'>
            <div className='book-wrap__book__page-wrap'>

            </div>
          </div>
        </div>        
      </main>
    );
  }
}

export { TextBook };