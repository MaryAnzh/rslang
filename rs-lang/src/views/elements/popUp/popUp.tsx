import React from 'react';
import './popUp.scss';

//import { render } from '@testing-library/react';

class PopUp extends React.Component {

  render() {
    return (
      <div className='pop-up'>
        <div className='pop-up__body'>
          { this.props.children }
        </div>       
      </div>
    );
  }
}

export { PopUp };