import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Statistics } from '../../pages/Statistics/Statistics';
import { StartPage } from '../../pages/startPage/StartPage';
import { Footer } from '../Footer/Footer';
import Header from '../header/header';
import  TextBook  from '../../pages/TextBook/TextBook';
import { SprintGameSettings } from '../../pages/SprintGameSettings/SprintGameSettings';
import { AudioCallGame } from '../../pages/AudioCallGame/AudioCallGame';
import { AudioCallGameSettings } from '../../pages/AudioCallGameSettings/AudioCallGameSettings';
import { SprintGame } from '../../pages/sprintGame/sprintGame';

export default function AppRouter() {
  return (
    <div className="root-container">
      <Header />
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="textbook" element={<TextBook />} />
        <Route path="sprint-settings" element={<SprintGameSettings />} />
        <Route path="audiocall-settings" element={<AudioCallGameSettings />} />
        <Route path="audiocall-game" element={<AudioCallGame />} />
        <Route path='sprint-game' element={<SprintGame />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
      <Footer />
    </div>
  );
}

// function HeaderView() {
//   const location = useLocation();
//   console.log(location.pathname);
//   return location.pathname;
// }
// const a = HeaderView();
