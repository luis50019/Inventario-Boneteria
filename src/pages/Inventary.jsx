import React from 'react'
import { Header } from '../components/Header'
import { Search } from '../components/Search';
import { CardsInfo } from '../components/CardsInfo.jsx';
import "../styles/CardInfo.css";

import { MdOutlineInventory2 } from 'react-icons/md';
import { fakeStadistics } from '../api/fakeValues.js';
export default function Inventary() {
  return (
    <div>
      <Header
        title="Bienvenido a tu inventario"
        caption="Aquí podrás gestionar, actualizar y revisar el estado de tus productos fácilmente"
        namePage="Inventario"
      >
        <MdOutlineInventory2 className="text-4xl" />
      </Header>
      <Search />
      <div className="flex justify-between mt-11 w-5/6 h-32">
        {fakeStadistics.map((info, index) => (
          <CardsInfo titleCard={info.title} valor={info.valor} key={index} className='text_inventary' />
        ))}
      </div>
    </div>
  );
}
