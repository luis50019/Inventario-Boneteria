import { FaSearch } from 'react-icons/fa';
import '../../styles/Search.css';
export function Search({placeholder}) {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className='mt-5 cont-search'>
        <input type='text' placeholder={placeholder} 
        className='input-search ' />
        <button className='btn-search z-10'>
          <FaSearch />
        </button>
      </form>
    </>
  );
}
