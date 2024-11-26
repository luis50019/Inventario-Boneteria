import { Suspense,lazy, useEffect } from 'react';

import { Routes, Route } from 'react-router';

const HomePage = lazy(()=>import('./pages/Home'));
const InventaryPage = lazy(()=>import('./pages/Inventary'));
const SalePage = lazy(()=>import('./pages/Sale'));
import NavBar from './components/NavBar';
function App() {
  
  return (
    <div className="container cont mx-auto pl-5 pt-5 relative">
      <Suspense fallback={<div>cargando ...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Sale" element={<SalePage />} />
          <Route path="/Inventary" element={<InventaryPage />} />
        </Routes>
      </Suspense>
      <NavBar />
    </div>
  );
}

export default App;
