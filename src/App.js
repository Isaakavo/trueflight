import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import SelectFlight from './components/SelectFlight/index'
import FinishBooking from './components/FinishBooking';
import Header from './components/Header';

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
