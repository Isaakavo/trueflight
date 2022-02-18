import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import SelectFlight from './components/SelectFlight';
import FinishBooking from './components/FinishBooking';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='/trueflight' element={<Dashboard />} />
        <Route path='/book' element={<SelectFlight />} />
        <Route path='/finish-purchase' element={<FinishBooking />} />
      </Routes>
    </div>
  );
}

export default App;
