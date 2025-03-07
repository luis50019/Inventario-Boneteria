import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Header } from "./Header";
import { LuShoppingCart } from "react-icons/lu";
import { headerInfo } from "../../utils/headerInfo";
import SaleProvider from "../../context/SaleContext";
import { FaArrowLeft } from "react-icons/fa";


export default function DashboardSales() {
  const [headerLocation, setHeaderLocation] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderLocation(headerInfo[location.pathname] || headerInfo["/Sale/:id"]);
  }, [location]);

  return (
    <>
      <SaleProvider>
        <div className="pb-12 min-h-[100vh] max-w-[99%]">
          <Header
            caption={headerLocation.caption}
            title={headerLocation.title}
            namePage={headerLocation.namePage}
          >
            {location.pathname == "/sale" ? (
              <LuShoppingCart className="text-4xl" />
            ) : location.pathname == "/sale/newSale" ? (<></>):(<FaArrowLeft className="text-4xl"
                            onClick={() => {
                              navigate("/sale");
                            }}
                          />)}
          </Header>
          <Outlet />
        </div>
      </SaleProvider>
    </>
  );
}
