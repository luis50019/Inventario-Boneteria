import { useState,useEffect } from 'react';
import { GoHome } from 'react-icons/go';
import { LuShoppingCart } from 'react-icons/lu';
import { MdOutlineInventory2 } from 'react-icons/md';
import { Link, useLocation } from 'react-router';

function NavBar() {
  const [navIsVisible,setNavIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/Sale" || location.pathname === "/Inventary" || location.pathname === "/" || location.pathname === "/Home"){
      setNavIsVisible(true);
    }else{
      setNavIsVisible(false);
    }
  },[location.pathname]);

  return (
    <>
      {
      navIsVisible &&(
        <div
      className={`
      flex w-5/6 justify-around fixed bottom-3 
    `}
    >
      <Link to="/">
        <button className="bg-[#F78C94] shadow-sm shadow-[#3f2224] text-[#fff] font-extrabold text-center rounded-full w-16 h-16 p-4">
          <GoHome className="text-3xl" />
        </button>
      </Link>
      <Link to="/Sale">
        <button className="bg-[#fff] shadow-sm shadow-[#333] font-extrabold rounded-full w-16 h-16 p-4">
          <LuShoppingCart className="text-3xl" />
        </button>
      </Link>
      <Link to='/Inventary'>
        <button className="bg-[#ffffff] shadow-sm shadow-[#333] font-extrabold rounded-full w-16 h-16 p-4">
          <MdOutlineInventory2 className=" text-3xl" />
        </button>
      </Link>
    </div>
      )
    }
    </>
  );
}

export default NavBar;