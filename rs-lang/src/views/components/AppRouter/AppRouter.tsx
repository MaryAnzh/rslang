import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Statistics } from '../../pages/Statistics/Statistics';
import { StartPage } from '../../pages/startPage/StartPage';
import { Footer } from '../Footer/Footer';
import { Header } from '../header/header';
import { TextBook } from '../../pages/TextBook/TextBook';
import { Games } from '../../pages/Games/Games';

export default function AppRouter() {
  return (
    <div className="root-container">
      <Header />
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="textbook" element={<TextBook />} />
        <Route path="games" element={<Games />} />
        <Route path="statistics" element={<Statistics />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}