import React from 'react';
import { WordCard } from '../../components/WordCard/WordCard';
import './TextBook.scss';

class TextBook extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.words = 
  // }

  render() {
    return (
      <main className="main">
        <div className='book-page-wrap'>
          <h1>У ч е б н и к</h1>
          <div className='book-page-wrap__book-wrap'>
            <div className='book-page-wrap__book-wrap__book'>
              <div className='book-page-wrap__book-wrap__book__sections'>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Уровень сложности 1</div>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Уровень сложности 2</div>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Уровень сложности 3</div>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Уровень сложности 4</div>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Уровень сложности 5</div>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Уровень сложности 6</div>
                <div className='book-page-wrap__book-wrap__book__sections__section'>Сложные слова</div>
              </div>
              <div className='book-page-wrap__card-container'>
                {/* <WordCard /> */}
              </div>
              {/* <div className='book-page-wrap__book-wrap__book__page-wrap'>
                <div className='book-page-wrap__book-wrap__book__page-wrap__page'>
                  <div className='book-page-wrap__book-wrap__book__page-wrap__page__controls'>
                    <div className='left-arrow'>
                      <div className='left-arrow__top'></div>
                      <div className='left-arrow__bottom'></div>
                    </div>
                    <p>Prev</p>
                    <div className='page-info'>
                      <p>Страница 1</p>
                    <p>Сложность 1</p>
                    </div>
                    
                    <p>Next</p>
                    <div className='right-arrow'>
                      <div className='right-arrow__top'></div>
                      <div className='right-arrow__bottom'></div>
                    </div>
                  </div>
                  <div className='book-page-wrap__book-wrap__book__page-wrap__page__content'>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export { TextBook };