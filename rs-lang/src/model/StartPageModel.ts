class StartPageModel {
  closeSignInOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const wrap = document.getElementById('headerForm');
    if (wrap !== null) {
      wrap.style.display = 'none';
    }
  }
}

const startPageModel = new StartPageModel();

export { startPageModel };