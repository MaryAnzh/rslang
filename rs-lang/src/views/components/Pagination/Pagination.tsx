import React from 'react';
import arrowBack from '../../../img/svg/arrow_back.svg';
import arrowForward from '../../../img/svg/arrow_forward.svg';
import { PaginationProps } from '../../../interfaces/types';
import './Pagination.scss';

class Pagination extends React.Component<PaginationProps> {
  render() {
    return (
      <div className='pagination'>
        <button onClick={this.props.downHandler} className='pagination__btn'>
          <img src={arrowBack} alt="back" />
        </button>
        <p className='pagination__text'>Страница &nbsp;&nbsp;&nbsp;{this.props.page}</p>
        <button onClick={this.props.upHandler} className='pagination__btn'>
          <img src={arrowForward} alt="back" />
        </button>
      </div>
    );
  }
}

export { Pagination };