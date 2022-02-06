import React from 'react';
import './startPage.scss';
import { BenefitCard } from '../../components/BenefitCard/BenefitCard';
import { PersonCard } from '../../components/PersonCard/PersonCard';

const cardTexts = [
  'Более 3000 слов разбиты на разделы по уровню твоей подготовки>',
  'Какой-то текст, пробуем передать под другим индексом',
  'Какой-то текст, пробуем передать под другим индексом',
];

const urls = {
  textbook: 'https://raw.githubusercontent.com/MaryAnzh/rslang-assets/main/assets/svg/book-icon.svg',
  game: 'https://raw.githubusercontent.com/MaryAnzh/rslang-assets/main/assets/svg/game.svg',
  statistics: 'https://raw.githubusercontent.com/MaryAnzh/rslang-assets/main/assets/svg/statistic.svg',
};

class StartPage extends React.Component {
  render() {
    return (
      <main className="main">
        <div className='start-page'>
          <h2 className="start-page__title">Оцените возможности и преимущества приложения</h2>
          <div className="start-page__list">
            <BenefitCard title='Учебник' text={cardTexts[0]} url={process.env.PUBLIC_URL + '/svg/book.svg'}/>
            <BenefitCard title='Игры' text={cardTexts[1]} url={urls.game}/>
            <BenefitCard title='Статистика' text={cardTexts[2]} url={urls.statistics}/>
          </div>
          <h2 className="start-page__title">Наша команда</h2>
          <div className="start-page__list">
            {/* <PersonCard />
            <PersonCard /> */}
          </div>
        </div>
      </main>
    );
  }
}

export { StartPage };
