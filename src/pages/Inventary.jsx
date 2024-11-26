import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { CardsInfo } from "../components/CardsInfo.jsx";
import Slider from "../components/Slider.jsx";
import "../styles/CardInfo.css";

import { MdOutlineInventory2 } from "react-icons/md";
import { fakeStadistics } from "../api/fakeValues.js";
import { getAllClothing } from "../api/api.js";
export default function Inventary() {

  useEffect(()=>{
    getAllClothing()
  },[])

  return (
    <div className="pb-12 h-[100vh] max-w-[95%]">
      <Header
        title="Bienvenido a tu inventario"
        caption="Aquí podrás gestionar, actualizar y revisar el estado de tus productos fácilmente"
        namePage="Inventario"
      >
        <MdOutlineInventory2 className="text-4xl" />
      </Header>
      
      <Search placeholder='calceta deportica,llavero marvel, llavero de plastico ...'/>

      <Slider>
        {fakeStadistics.map((info, index) => (
          <CardsInfo titleCard={info.title} valor={info.valor} key={index} />
        ))}
      </Slider>
    </div>
  );
}
