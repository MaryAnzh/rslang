import React from 'react';
import './startPage.scss';
import logo from '../../../img/logo.svg';
import { BenefitCard } from '../../components/BenefitCard/BenefitCard';
import { PersonCard } from '../../components/PersonCard/PersonCard';
//import { render } from '@testing-library/react';

class StartPage extends React.Component {
  render() {
    return (
      <main className="start-page main">
        <h2 className="start-page__title">Оцените возможности и преимущества приложения</h2>
        <div className="start-page__list">
          <BenefitCard>dfsdfsdfsdfs</BenefitCard>
          <BenefitCard />
          <BenefitCard />
          <BenefitCard />
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
