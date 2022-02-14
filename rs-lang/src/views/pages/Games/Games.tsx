import React from 'react';
import './Games.scss';

class Games extends React.Component {
  render() {
    return (
      <main className="main">
        <div className='games-page-wrap'>
          <h1>И г р ы</h1>
          <div className='games-page-wrap__games-wrap'>
            <div className='games-page-wrap__games-wrap__setting'>
              <div className='games-page-wrap__games-wrap__setting__sections'>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Уровень сложности 1</div>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Уровень сложности 2</div>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Уровень сложности 3</div>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Уровень сложности 4</div>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Уровень сложности 5</div>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Уровень сложности 6</div>
                <div className='games-page-wrap__games-wrap__setting__sections__section'>Сложные слова</div>
              </div>
              <div className='games-page-wrap__games-wrap__setting__checkboxs'>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>
                </div>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>

                </div>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>

                </div>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>

                </div>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>

                </div>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>

                </div>
                <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox'>
                  <div className='games-page-wrap__games-wrap__setting__checkboxs__checkbox__oval'></div>

                </div>
              </div>
            </div>
            <div className='games-page-wrap__games-wrap__audio-call'>
              <h2>Аудиовызов</h2>
              <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
            </div>
            {/* <div className='games-page-wrap__games-wrap__sprint'>
              <h2>Спринт</h2>
              <div className='games-page-wrap__games-wrap__audio-call__game-start'>Играть</div>
            </div> */}
          </div>
        </div>
      </main >
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { Games };