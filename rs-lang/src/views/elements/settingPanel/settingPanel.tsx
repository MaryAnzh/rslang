import React, { CSSProperties, ReactElement } from 'react';
import './settingPanel.scss';
import { applicationModel } from '../../../model/ApplicationModel';

type SettingPanelState = {
  activeClass__0: string,
  activeClass__1: string,
  activeClass__2: string,
  activeClass__3: string,
  activeClass__4: string,
  activeClass__5: string,
  activeClass__6: string,
}

class SettingPanel extends React.Component {
  state: SettingPanelState;

  isActive = false;

  activeButton = -1;

  constructor(props: {}) {
    super(props);
    this.state = {
      activeClass__0: 'setting__sections__level',
      activeClass__1: 'setting__sections__level',
      activeClass__2: 'setting__sections__level',
      activeClass__3: 'setting__sections__level',
      activeClass__4: 'setting__sections__level',
      activeClass__5: 'setting__sections__level',
      activeClass__6: 'setting__sections__level',
    }
  }

  buttonOnClick(e: React.MouseEvent<HTMLDivElement>) {
    applicationModel.gameFromBook = false;
    const elem = e.target as HTMLButtonElement;
    let buttonNumberTxt = elem.dataset.index;
    const buttonNumber = (buttonNumberTxt == undefined) ? 0 : +buttonNumberTxt;

    if (!this.isActive) {
      this.unActiveButtonState();
      this.isActive = true;
      this.activeButton = buttonNumber;
      this.activeButtonState(buttonNumber);
      applicationModel.gameLevel = buttonNumber;
      applicationModel.gamePage = 0;
    } else {
      this.unActiveButtonState();
      if (this.activeButton === buttonNumber) {
        this.isActive = false;
        this.activeButton = -1;
        applicationModel.gameLevel = 0;
        applicationModel.gamePage = 0;
      } else {
        this.isActive = true;
        this.activeButton = buttonNumber;
        this.activeButtonState(buttonNumber);
        applicationModel.gameLevel = buttonNumber;
        applicationModel.gamePage = 0;
      }

    }
  }

  activeButtonState(buttonNumberTxt: number) {
    switch (buttonNumberTxt) {
      case 0:
        this.setState({ activeClass__0: 'setting__sections__level level-active' });
        break;
      case 1:
        this.setState({ activeClass__1: 'setting__sections__level level-active' });
        break;
      case 2:
        this.setState({ activeClass__2: 'setting__sections__level level-active' });
        break;
      case 3:
        this.setState({ activeClass__3: 'setting__sections__level level-active' });
        break;
      case 4:
        this.setState({ activeClass__4: 'setting__sections__level level-active' });
        break;
      case 5:
        this.setState({ activeClass__5: 'setting__sections__level level-active' });
        break;
      case 6:
        this.setState({ activeClass__6: 'setting__sections__level level-active' });
        break;
      default:
        break;
    }
  }

  unActiveButtonState() {
    this.setState({
      activeClass__0: 'setting__sections__level',
      activeClass__1: 'setting__sections__level',
      activeClass__2: 'setting__sections__level',
      activeClass__3: 'setting__sections__level',
      activeClass__4: 'setting__sections__level',
      activeClass__5: 'setting__sections__level',
      activeClass__6: 'setting__sections__level',
    });
  }

  render(): React.ReactNode {
    let userClass = applicationModel.isAuthorization ? this.state.activeClass__6 : this.state.activeClass__6 + ' blocked';
    return (
      <div className='setting'>
        <div className='setting__sections'>
          <div
            data-index='0'
            className={this.state.activeClass__0}
            onClick={(e) => { this.buttonOnClick(e) }}
          >Уровень сложности 1</div>
          <div
            onClick={(e) => { this.buttonOnClick(e) }}
            data-index='1' className={this.state.activeClass__1}>Уровень сложности 2</div>
          <div
            onClick={(e) => { this.buttonOnClick(e) }}
            data-index='2' className={this.state.activeClass__2}>Уровень сложности 3</div>
          <div
            onClick={(e) => { this.buttonOnClick(e) }}
            data-index='3' className={this.state.activeClass__3}>Уровень сложности 4</div>
          <div
            onClick={(e) => { this.buttonOnClick(e) }}
            data-index='4' className={this.state.activeClass__4}>Уровень сложности 5</div>
          <div
            onClick={(e) => { this.buttonOnClick(e) }}
            data-index='5' className={this.state.activeClass__5}>Уровень сложности 6</div>
          <div data-index='6' className={userClass}>Сложные слова</div>
        </div>
      </div>
    )
  }
}

export { SettingPanel };