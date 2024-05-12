import './App.css'
import Header from './components/Header'
import { Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LotsPage from './pages/LotsPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import MoreInfoPage from './pages/MoreInfoPage';
import { useState } from 'react';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import CreateLotModal from './components/CreateLotModal';

function App() {
  const [registerModalActive, setRegisterModalActive] = useState(false);
  const [loginModalActive, setLoginModalActive] = useState(false);
  const [createLotModalActive, setCreateLotModalActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <Header setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setLoginModalActive={setLoginModalActive} setRegisterModalActive={setRegisterModalActive} setCreateLotModalActive={setCreateLotModalActive}/>
      
      <Routes>
              <Route path="" element={<MainPage/>}/>
              <Route path="lots" element ={<LotsPage/>}/>
              <Route path="account" element ={<AccountPage isAuthenticated={isAuthenticated}/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
              <Route path="lots/:id" element={<MoreInfoPage/>}/>
      </Routes>
      <RegisterModal modalActive={registerModalActive} setModalActive={setRegisterModalActive} />
      <LoginModal modalActive={loginModalActive} setModalActive={setLoginModalActive} setIsAuthenticated={setIsAuthenticated} />
      <CreateLotModal modalActive={createLotModalActive} setModalActive={setCreateLotModalActive}/>
    </div>
  )
}

export default App
