import { lazy } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./pages/Home";
import NavBar from "./components/Layout/NavBar";
const InfoSale = lazy(()=>import("./pages/InfoSale"));
const InventaryPage = lazy(() => import("./pages/Inventary"));
const SalePage = lazy(() => import("./pages/Sale"));
const DashboardInventary = lazy(() => import("./components/Layout/Dashboard"));
const DashboardSales = lazy(()=> import("./components/Layout/DashboardSales"));
const Product = lazy(() => import("./pages/Product"));
const NewSale = lazy(()=>import("./pages/NewSale"));

function App() {
  return (
    <div className="container cont mx-auto pl-5 pt-5 relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Sale" element={<DashboardSales />} >
          <Route index element={<SalePage />} />
          <Route path=":id" element={<InfoSale/>}/>
          <Route path="newSale" element={<NewSale/>}/>

        </Route>
        <Route path="/Inventary" element={<DashboardInventary />}>
          <Route index element={<InventaryPage />} />
          <Route path="NewProduct" element={<Product />} />
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
