import React from 'react';
import logo from '../../img/logo.svg';
import '../../css/header.scss';
import { render } from '@testing-library/react';

class StartPage extends React.Component {
	render() {
		return (
			<main className="start-page">
				<img src={logo} className="start-page-logo" alt="logo" />
				
			</main>

		);
	}
}
//экспорт для функции
//export default Header
//экспорт для класса
export { StartPage };
