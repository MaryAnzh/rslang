import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Statistics } from '../../pages/Statistics/Statistics';
import { StartPage } from '../../pages/startPage/StartPage';
import { Footer } from '../Footer/Footer';
import { Header } from '../header/header';

export default function App() {
  return (
    <div className="root-container">
      <Header />
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="statistics" element={<Statistics />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}