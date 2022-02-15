import React from 'react';
import { connect } from 'react-redux';
import arrowBack from '../../../img/svg/arrow_back.svg';
import arrowForward from '../../../img/svg/arrow_forward.svg';
import { ButtonsGlobState, PaginationProps } from '../../../interfaces/types';
import GameLinks from '../GameLinks/GameLinks';
import './Pagination.scss';

const mapStateToProps = (state: ButtonsGlobState, ownProps: PaginationProps ) => {
  return {
    ...ownProps,
    isAutorize: state.buttons.isAutorize,
  }
};

const connector = connect(mapStateToProps, null);

class Pagination extends React.Component<PaginationProps> {
  render() {
    // console.log('pagination render: ' + this.props.isAutorize);
    return (
      <div className='pagination'>
        <button onClick={this.props.downHandler} className='pagination__btn'>
          <img src={arrowBack} alt="back" />
        </button>
        <p className='pagination__text'>Страница &nbsp;&nbsp;&nbsp;{this.props.page}</p>
        <button onClick={this.props.upHandler} className='pagination__btn'>
          <img src={arrowForward} alt="back" />
        </button>
        {this.props.isAutorize && <GameLinks />}
      </div>
    );
  }
}


export default connector(Pagination);
// export { Pagination };