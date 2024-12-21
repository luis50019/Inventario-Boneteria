import { Graph } from '../components/Graph.jsx';
import { Header } from '../components/Header.jsx'
import { GoHome } from 'react-icons/go';
import {Search} from '../components/Search.jsx'
import {getAllClothing} from '../api/api.js'
import { CardsInfo } from '../components/CardsInfo.jsx';
import { fakeValues } from '../api/fakeValues.js';

import { UseContextApp } from '../context/AppContext.jsx';
import { useEffect, useState } from 'react';

export default function HomePage(){
  
  const { isLoading } = UseContextApp();
  const [product, setProduct] = useState([]);
  useEffect( ()=>{
    const getData =async()=>{
      try{
        const res = await getAllClothing();
        console.log(res);
        setProduct(res);
      }catch(e){
        console.log(e);
      }
    }
    getData()
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
      
      <div>
      {
          product?.map((product,index)=>(
            <div key={index}>
              <p>{product.productName}</p>
            </div>
          ))
        }
      </div>
      {/*<div className="mt-5 max-w-[95%] grid min-h-56 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] place-items-center gap-4">
         {fakeValues.map((info, index) => (
          <CardsInfo titleCard={info.title} valor={info.valor} key={index} />
        ))} 
      </div>*/}
   </div>
   </>
 );
}