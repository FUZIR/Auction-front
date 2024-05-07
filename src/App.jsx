import './App.css'
import Header from './components/Header'
import React from "react";
import { Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LotsPage from './pages/LotsPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import MoreInfoPage from './pages/MoreInfoPage';
import { useState } from 'react';
import RegisterModal from './components/RegisterModal';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <Header setModalActive={setModalActive} />
      
      <Routes>
              <Route path="*" element = {<MainPage/>}/>
              <Route path="lots" element ={<LotsPage/>}/>
              <Route path="account" element ={<AccountPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
              <Route path="lots/:id" element={<MoreInfoPage/>}/>
      </Routes>
      <RegisterModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  )
}

export default App
