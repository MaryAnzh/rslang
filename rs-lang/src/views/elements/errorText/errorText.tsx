import { stringify } from 'querystring';
import React from 'react';
import './textError.scss';
import { authorizationAppModel } from '../../../model/AuthorizationAppModel';
import { AppProperties } from '../../../interfaces/appProperties';

type ErrorTextStatus = {
  textError: string;
}

class ErrorText extends React.Component {

  render() {
    return (
      <div id='server-error' className='new-server-error'>
        <p id='server-error-text' className='new-server-error__text'></p>
        <button
          onClick={(e) => { authorizationAppModel.bavkToFormFromErrorOnClick(e) } }
        >Понятно</button>
      </div>
    );
  }
}

export { ErrorText };

