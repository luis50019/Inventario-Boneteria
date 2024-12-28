import {lazy } from 'react';

import { Routes, Route } from 'react-router';

import HomePage from './pages/Home';
const InventaryPage = lazy(()=>import('./pages/Inventary'));
const SalePage = lazy(()=>import('./pages/Sale'));
const NewProduct = lazy(()=> import('./pages/NewProduct'));
const DashboardInventary = lazy(()=> import('./components/Layout/Dashboard'))
const Product = lazy(()=> import('./pages/Product'));

import NavBar from './components/Layout/NavBar';

function App() {
  
  return (
    <div className="container cont mx-auto pl-5 pt-5 relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Sale" element={<SalePage />} />
          <Route path="/Inventary" element={<DashboardInventary />} >
            <Route index element={<InventaryPage/>} />
            <Route path="NewProduct" element={<Product />} />
            <Route path=":id" element={<Product/>}/>
          </Route>
        </Routes>
      <NavBar />
    </div>
  );
}

export default App;
