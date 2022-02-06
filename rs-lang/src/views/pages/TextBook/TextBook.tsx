import React from 'react';
import './TextBook.scss';

class TextBook extends React.Component {
  render() {
    return (
      <main className="main">
        <div className='book-page-wrap'>
          <h1>У ч е б н и к</h1>
          <div className='book-page-wrap__book-wrap'>
            <div className='book-page-wrap__book-wrap__book'>
              <div className='book-page-wrap__book-wrap__book__sections'>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
                <div className='book-page-wrap__book-wrap__book__sections__section'></div>
              </div>
              
            </div>
          </div>
        </div>        
      </main>
    );
  }
}

export { TextBook };