import { Graph } from '../components/UI/Graph.jsx';
import { Header } from '../components/Layout/Header.jsx'
import { GoHome } from 'react-icons/go';
import { CardsInfo } from '../components/Cards/CardsInfo.jsx';
import { useInfoInventary } from '../hooks/useInfoInventary.js';
import { headerInfo } from '../utils/headerInfo.js';
export default function HomePage(){
  
  const {InfoInventary, errorInfo, isLoadingInfo} = useInfoInventary(); 

 return (
  <>
    <div className="pb-12 max-w-[95%]">
      <Header
       title={headerInfo.Home.title}
       namePage={headerInfo.Home.namePage}
       caption={headerInfo.Home.caption}
      >
      <GoHome className="text-4xl" />
      </Header>
      <Graph/>
      {
        isLoadingInfo? <p>Cargando Datos del inventario...</p>:<>
        <div className="mt-5 max-w-[95%] grid min-h-56 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] place-items-center gap-4">
          {
            errorInfo ? <p>{errorInfo}</p>: InfoInventary.slice(0,2).map(({title,value},index)=>(
              <CardsInfo key={index} titleCard={title} valor={value}/>
            ))
          }
        </div>
      </>
      }
    </div>
  </>
 );
}