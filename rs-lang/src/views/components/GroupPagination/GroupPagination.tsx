import React from 'react';
import { GroupPaginationProps } from '../../../interfaces/types';
import './GroupPagination.scss';

class GroupPagination extends React.Component<GroupPaginationProps> {


  render() {
    return (
      <div className='group-pagination'>
        <p className='group-pagination__text'>Раздел &nbsp;&nbsp;{this.props.group}</p>
        <button key="0" onClick={() => {this.props.groupHandler(0)}} className='group-pagination__btn'>
          1
        </button>
        <button key="1" onClick={() => {this.props.groupHandler(1)}} className='group-pagination__btn'>
          2
        </button>
        <button key="2" onClick={() => {this.props.groupHandler(2)}} className='group-pagination__btn'>
          3
        </button>
        <button key="3" onClick={() => {this.props.groupHandler(3)}} className='group-pagination__btn'>
          4
        </button>
        <button key="4" onClick={() => {this.props.groupHandler(4)}} className='group-pagination__btn'>
          5
        </button>
        <button key="5" onClick={() => {this.props.groupHandler(5)}} className='group-pagination__btn'>
          6
        </button>
        <button key="6" onClick={() => {this.props.groupHandler(6)}} className='group-pagination__btn group-pagination__tooltip'>
          7
        </button>
      </div>
    );
  }
}

export { GroupPagination };