import React from 'react';
import { newDataService } from '../../../dataServer/dataService';
import { TextBookState } from '../../../interfaces/types';
import { userStorage } from '../../../model/UserStorage';
import  GroupPagination from '../../components/GroupPagination/GroupPagination';
import  Pagination from '../../components/Pagination/Pagination';
import { WordCard } from '../../components/WordCard/WordCard';
import './TextBook.scss';

class TextBook extends React.Component {
  bg: string;

  state: TextBookState;

  constructor(props: {}) {
    super(props);
    this.bg = '#fcddb1';
    this.state = {
      words: [],
      page: userStorage.page,
      group: userStorage.group,
    };
    this.PageDownHandler = this.PageDownHandler.bind(this);
    this.PageUpHandler = this.PageUpHandler.bind(this);
    this.GroupHandler = this.GroupHandler.bind(this);
  }

  shouldComponentUpdate(nextProps: {}, nextState: TextBookState) {
    if (nextState.words !== this.state.words) {
      return true;
    } else {
      return false;
    }
  }

  GroupHandler(group: number, page: number = 0) {
    userStorage.setPageGroupToLocalStorage(group, page);
    switch (group) {
      case 0:
        this.bg = '#fcddb1';
        break;
      case 1:
        this.bg = '#f0dab6';
        break;
      case 2:
        this.bg = '#dbd3c0';
        break;
      case 3:
        this.bg = '#c4cfcd';
        break;
      case 4:
        this.bg = '#aebfca';
        break;
      case 5:
        this.bg = '#c3d1df';
        break;
      case 6:
        this.bg = '#abc1d8';
        break;
      default:
        break;
    }
    if (this.state.group !== group) {
      newDataService.getWords(group, page).then(response => {
        this.setState((prev: TextBookState) => {
          if (prev.words !== response) {
            return {
              words: response,
            };
          }
        });
      });
      this.setState(() => ({
        group: group,
        page: page,
      }));
    }
  }

  PageDownHandler() {
    if (this.state.page !== 0) {
      userStorage.setPageGroupToLocalStorage(this.state.group, this.state.page - 1);
      newDataService.getWords(this.state.group, this.state.page - 1).then(response => {
        this.setState((prev: TextBookState) => {
          if (prev.words !== response) {
            return {
              words: response,
            };
          }
        });
      });
      this.setState((prev: TextBookState) => ({
        page: prev.page - 1,
      }));
    }
  }

  PageUpHandler() {
    if (this.state.page !== 29) {
      userStorage.setPageGroupToLocalStorage(this.state.group, this.state.page + 1);
      newDataService.getWords(this.state.group, this.state.page + 1).then(response => {
        this.setState((prev: TextBookState) => {
          if (prev.words !== response) {
            return {
              words: response,
            };
          }
        });
      });
      this.setState((prev: TextBookState) => ({
        page: prev.page + 1,
      }));
    }
  }

  componentDidMount() {
    newDataService.getWords(this.state.group, this.state.page).then(response => {
      this.setState({
        words: response,
      });
    });
  }

  render() {
    console.log(`Page: ${this.state.page}; Group: ${this.state.group}`);
    let words: JSX.Element[] | '' = [];
    if (this.state.words.length) {
      words = this.state.words.map((word, index) => <WordCard key={index} word={word}/>)
    } else {
      words = '';
    }
    return (
      <main className="main">
        <div className='book-page-wrap'>
          <h1>У ч е б н и к</h1>
          <div className='book-page-wrap__book-wrap'>
            <div className='book-page-wrap__controls'>
              <Pagination downHandler={this.PageDownHandler} upHandler={this.PageUpHandler} page={this.state.page + 1}/>
              <GroupPagination group={this.state.group + 1} groupHandler={this.GroupHandler}/>
            </div>
            <div className='book-page-wrap__book-wrap__book' style={ { backgroundColor: this.bg } }>
              <div className='book-page-wrap__card-container'>
                {words}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export { TextBook };