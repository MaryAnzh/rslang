import React from 'react';
import { newDataService } from '../../../dataServer/dataService';
import { TextBookState, WordCardProps, WordCardType } from '../../../interfaces/types';
import { GroupPagination } from '../../components/GroupPagination/GroupPagination';
import { Pagination } from '../../components/Pagination/Pagination';
import { WordCard } from '../../components/WordCard/WordCard';
import './TextBook.scss';

class TextBook extends React.Component {
  page: number;

  group: number;

  state: TextBookState;

  constructor(props: {}) {
    super(props);
    this.page = 0;
    this.group = 0;
    this.state = {
      words: [],
      page: 0,
      group: 0,
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

  GroupHandler(group: number) {
    if (this.state.group !== group) {
      newDataService.getWords(group, this.state.page).then(response => {
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
      }));
    }
  }

  PageDownHandler() {
    if (this.state.page !== 0) {
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
              <GroupPagination groupHandler={this.GroupHandler}/>
            </div>
            <div className='book-page-wrap__book-wrap__book'>
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