import { Graph } from '../components/Graph.jsx';
import { Header } from '../components/Header.jsx'
import { GoHome } from 'react-icons/go';
import {Search} from '../components/Search.jsx'
import { CardsInfo } from '../components/CardsInfo.jsx';
import { fakeValues } from '../api/fakeValues.js';

import { UseContextApp } from '../context/AppContext.jsx';
import { useEffect, useState } from 'react';

export default function HomePage(){
  
  const { getStadistics,data,isLoading } = UseContextApp();
  useEffect(()=>{
    getStadistics()
  },[])

 return (
   <>

      <div className="pb-12 max-w-[95%]">
      <Header
       title={"¡Estamos listos para ayudarte!"}
       namePage={"Inicio"}
       caption={
         "Aquí podrás gestionar, actualizar y revisar el estado de tus productos fácilmente"
       }
      >
      <GoHome className="text-4xl" />
      </Header>
      {
        isLoading?(<div>cargando ..</div>):(
          <Graph infoStadistic={data} />
        )
      }

      <div className="mt-5 max-w-[95%] grid min-h-56 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] place-items-center gap-4">
        {fakeValues.map((info, index) => (
          <CardsInfo titleCard={info.title} valor={info.valor} key={index} />
        ))}
      </div>
   </div>
   </>
 );
}