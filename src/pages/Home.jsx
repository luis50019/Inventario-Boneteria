import { Graph } from '../components/Graph.jsx';
import { Header } from '../components/Header.jsx'
import { GoHome } from 'react-icons/go';
import {Search} from '../components/Search.jsx'
import { CardsInfo } from '../components/CardsInfo.jsx';
import { fakeValues } from '../api/fakeValues.js';

export default function HomePage(){
 return (
   <div className='pb-12 w-80'>
     <Header
       title={'¡Estamos listos para ayudarte!'}
       namePage={'Inicio'}
       caption={
         'Aquí podrás gestionar, actualizar y revisar el estado de tus productos fácilmente'
       }
     >
       <GoHome className='text-4xl' />
     </Header>
     <Search />
     <Graph />
{/* 
     <div className='flex justify-between mt-11 mb-10 w-full h-48'>
       {fakeValues.map((info, index) => (
         <CardsInfo titleCard={info.title} valor={info.valor} key={index} />
       ))}
     </div> */}
   </div>
 );
}