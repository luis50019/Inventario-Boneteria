import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Header } from "./Header";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { headerInfo } from "../../utils/headerInfo";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate()
  const [locationRoute,setLocationRoute] = useState({});
  
  useEffect(()=>{
    setLocationRoute(headerInfo[location.pathname] || headerInfo['/Inventary/:id'])
  },[location.pathname])

  return (
    <>
      <div className="pb-12 h-[100vh] max-w-[95%]">
        <Header
          title={locationRoute?.title}
          caption={locationRoute?.caption}
          namePage={locationRoute?.namePage}
        >
          {
            location.pathname == '/Inventary'?
            <MdOutlineInventory2 className="text-4xl" />:
            <FaArrowLeft className="text-4xl"
            onClick={()=>{
              navigate('/Inventary')
            }}/>
          }
        </Header>
        
        <Outlet/>
      </div>
    </>
  );
}
