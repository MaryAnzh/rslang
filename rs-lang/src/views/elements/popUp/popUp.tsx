import React from 'react';
import './popUp.scss';
import { Cross } from '../cross/cross';

//import { render } from '@testing-library/react';

class PopUp extends React.Component {
	
  render() {
    return (
      <div className='pop-up' id='sign-in'>
        <div className='pop-up__body'>
          <Cross/>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export { PopUp };