import { Routes, Route } from 'react-router-dom';
import { Statistics } from '../../pages/Statistics/Statistics';
import { StartPage } from '../../pages/startPage/StartPage';
import { Footer } from '../Footer/Footer';
import Header from '../header/header';
import  TextBook  from '../../pages/TextBook/TextBook';
import { Games } from '../../pages/Games/Games';
import { AudioCallGame } from '../../pages/AudioCallGame/AudioCallGame';
import { AudioCallGameSettings } from '../../pages/AudioCallGame.Settings/AudioCallGameSettings';

export default function AppRouter() {
  return (
    <div className="root-container">
      <Header />
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="textbook" element={<TextBook />} />
        <Route path="games" element={<Games />} />
        <Route path="audiocall" element={<AudioCallGameSettings />} />
        <Route path="audiocallgame" element={<AudioCallGame />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
      <Footer />
    </div>
  );
}