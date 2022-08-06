import React from 'react';
import Navbar from './components/Navbar';
import TimerPage from './pages/TimerPage';

function App() {
  return (
    <div className='app-wrap'>
      <div className="container">
        <Navbar/>
        <TimerPage/>
      </div>
    </div>
  );
}

export default App;
