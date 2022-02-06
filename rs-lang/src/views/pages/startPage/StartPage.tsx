import React from 'react';
import './startPage.scss';
import { BenefitCard } from '../../components/BenefitCard/BenefitCard';
import { PersonCard } from '../../components/PersonCard/PersonCard';
//import { render } from '@testing-library/react';

const cardTexts = [
  'Более 3000 слов разбиты на разделы по уровню твоей подготовки>',
  'Какой-то текст, пробуем передать под другим индексом',
  'Какой-то текст, пробуем передать под другим индексом',
]

const urls = {
  textbook: 'https://raw.githubusercontent.com/MaryAnzh/rslang-assets/main/assets/svg/book-icon.svg',
  game: 'https://raw.githubusercontent.com/MaryAnzh/rslang-assets/main/assets/svg/game.svg',
  statistics: 'https://raw.githubusercontent.com/MaryAnzh/rslang-assets/main/assets/svg/statistic.svg',
}

const urls2 = {
  textbook: './book.svg',
  game: './games.svg',
  statistics: './bar-chart.svg',
}

class StartPage extends React.Component {
  render() {
    return (
      <main className="start-page main">
        <h2 className="start-page__title">Оцените возможности и преимущества приложения</h2>
        <div className="start-page__list">
          <BenefitCard title='Учебник' text={cardTexts[0]} url={urls2.textbook}/>
          <BenefitCard title='Игры' text={cardTexts[1]} url={urls2.game}/>
          <BenefitCard title='Статистика' text={cardTexts[2]} url={urls2.statistics}/>
        </div>
        <h2 className="start-page__title">Наша команда</h2>
        <div className="start-page__list">
          <PersonCard />
          <PersonCard />
        </div>
      </main>
    );
  }
}
//экспорт для функции
//export default Header
//экспорт для класса
export { StartPage };
