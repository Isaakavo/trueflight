import { Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import SelectFlight from './components/SelectFlight';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/book' element={<SelectFlight />} />
        <Route path='/finis-purchase' />
      </Routes>
    </div>
  );
}

export default App;
