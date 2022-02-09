import React from 'react';
import './popUp.scss';

//import { render } from '@testing-library/react';

class PopUp extends React.Component {

  render() {
    return (
      <div className='pop-up'>
        <div id='form-body' className='pop-up__body pop-up__body-refister-form'>
          { this.props.children }
        </div>       
      </div>
    );
  }
}

export { PopUp };