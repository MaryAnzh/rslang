import { applicationModel } from './ApplicationModel';

class StartPageModel {
  
  closeSignInOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const wrap = document.getElementById('headerForm');
    if (wrap !== null) {
      wrap.style.display = 'none';
      applicationModel.secondClickSingInForm = true;
    }
  }
}

const startPageModel = new StartPageModel();

export { startPageModel };