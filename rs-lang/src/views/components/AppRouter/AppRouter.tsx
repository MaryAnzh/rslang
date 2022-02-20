import { Routes, Route } from 'react-router-dom';
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
        <Route path="sprintsettings" element={<SprintGameSettings />} />
        <Route path="audiocall" element={<AudioCallGameSettings />} />
        <Route path="audiocallgame" element={<AudioCallGame />} />
        <Route path='srintgame' element={<SprintGame />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
      <Footer />
    </div>
  );
}