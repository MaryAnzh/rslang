import React from 'react';
import { connect } from 'react-redux';
import { newDataService } from '../../../dataServer/dataService';
import { ArrayActionProps, ButtonsGlobState, TextBookState } from '../../../interfaces/types';
import { applicationModel } from '../../../model/ApplicationModel';
import { userStorage } from '../../../model/UserStorage';
import  GroupPagination from '../../components/GroupPagination/GroupPagination';
import  Pagination from '../../components/Pagination/Pagination';
import WordCard from '../../components/WordCard/WordCard';
import './TextBook.scss';

const mapStateToProps = (state: ButtonsGlobState) => {
  return {
    hardsArray: state.glob.hardsArray,
    easyArray: state.glob.easyArray,
  }
};

const connector = connect(mapStateToProps, null);


class TextBook extends React.Component< ArrayActionProps > {
  bg: string;

  state: TextBookState;

  constructor(props: ArrayActionProps) {
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

  shouldComponentUpdate(nextProps: { hardsArray?: string[] }, nextState: TextBookState) {
    if (nextProps.hardsArray !== this.props.hardsArray && this.state.group === 6) {
      this.GroupHandler(this.state.group, this.state.page);
    }
    return true;
    // if (nextState.words !== this.state.words) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  GroupHandler(group: number, page: number = 0) {
    userStorage.setPageGroupToLocalStorage(group, page);
    if (this.state.group !== group || group === 6) {
      if (group === 6) {
        newDataService.getAgrHardWords().then(response => {
          this.setState((prev: TextBookState) => {
            if (prev.words !== response) {
              return {
                words: response,
              };
            }
          });
        });
      } else {
        newDataService.getWords(group, page).then(response => {
          this.setState((prev: TextBookState) => {
            if (prev.words !== response) {
              return {
                words: response,
              };
            }
          });
        });
      }
      this.setState(() => ({
        group: group,
        page: page,
      }));
    }
  }

  PageDownHandler() {
    if (this.state.group !== 6) {
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
  }

  PageUpHandler() {
    if (this.state.group !== 6) {
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
  }

  async componentDidMount() {
    if (this.state.group === 6) {
      if (userStorage.auth.userId) {
        // вот здесь не выполняется так как userstorage что не выполнил, parse
        newDataService.getAgrHardWords().then(response => {
          console.log(response);
          this.setState({
            words: response,
          });
        });
      }
    } else {
      newDataService.getWords(this.state.group, this.state.page).then(response => {
        this.setState({
          words: response,
        });
      });
    }
  }

  updateBackground() {
    switch (this.state.group) {
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
  }

  render() {
    this.updateBackground();
    
    applicationModel.currentWordArray = this.state.words;

    console.log(`Page: ${this.state.page}; Group: ${this.state.group}`);


    let words: JSX.Element[] | null;
    if (this.state.words.length) {
      words = this.state.words.map((word, index) => <WordCard key={index} word={word}/>);
      if (this.state.words.every(word => this.props.easyArray?.includes(word.id))) {
        console.log('green');
        this.bg = '#b4f1c4';
      }
    } else {
      words = null;
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

// export { TextBook };
export default connector(TextBook);