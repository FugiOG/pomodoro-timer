import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import TimerPage from './pages/TimerPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className='app-wrap'>
      <div className="container">
        <Navbar/>
        <Routes>
          <Route path='/' element={<TimerPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
