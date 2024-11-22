import { GoHome } from 'react-icons/go';
import { LuShoppingCart } from 'react-icons/lu';
import { MdOutlineInventory2 } from 'react-icons/md';

function NavBar() {
  return (
    <div
      className={`
      flex w-5/6 justify-around fixed bottom-1
    `}
    >
      <button className='bg-[#F78C94] text-[#fff] font-extrabold rounded-full w-12 h-12 p-4'>
        <GoHome className='stroke-2' />
      </button>
      <button className='bg-[#fff] font-extrabold rounded-full w-12 h-12 p-4'>
        <LuShoppingCart className='stroke-2' />
      </button>
      <button className='bg-[#ffffff] font-extrabold rounded-full w-12 h-12 p-4'>
        <MdOutlineInventory2 />
      </button>
    </div>
  );
}

export default NavBar;