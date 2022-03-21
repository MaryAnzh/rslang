import React from 'react';
import './startPage.scss';
import { BenefitCard } from '../../components/BenefitCard/BenefitCard';
import { PersonCard } from '../../components/PersonCard/PersonCard';

const cardTexts = [
  '3600 слов разбиты на разделы по уровню твоей подготовки.',
  'Тренируясь в игровой форме, обучение становится более эффективным',
  'Ведение статистики - это отличный стимул для регулярных занятий',
];

const cardTeamTexts = [
  'Разработала дизайн приложения. Создала хедер, реализовала регистрацию и авторизацию. Сделала 2 игры (Аудиовызов и Спринт), а также работа с API.',
  'Создал главную, учебник и список слов. Сделал деплой бекенда, реализовал управление состоянием с помощью Redux, функционал изученных слов и прогресс обучения. Работа с API.',
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
          <section className='start-page__benefits-wrapper'>
          <h2 className="start-page__title">Оцените возможности и преимущества приложения</h2>
          <div className="start-page__list">
            <BenefitCard title='Учебник' text={cardTexts[0]} url={process.env.PUBLIC_URL + '/svg/book.svg'}/>
            <BenefitCard title='Игры' text={cardTexts[1]} url={urls.game}/>
            <BenefitCard title='Статистика' text={cardTexts[2]} url={urls.statistics}/>
          </div>
          </section>
          <section className='start-page__team-wrapper team'>
            <h2 className="start-page__title team__title">Наша команда</h2>
            <div className="start-page__list">
            <PersonCard title='Мария Ващаева' text={cardTeamTexts[0]} url={process.env.PUBLIC_URL + '/avatars/mary.jfif'} github="https://github.com/MaryAnzh"/>
            <PersonCard title='Сергей Масюк' text={cardTeamTexts[1]} url={process.env.PUBLIC_URL + '/avatars/sergey.jpg'} github="https://github.com/mayerror"/>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

export { StartPage };
