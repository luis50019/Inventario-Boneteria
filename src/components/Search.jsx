import { FaSearch } from 'react-icons/fa';
import '../styles/Search.css';
export function Search() {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className='mt-2 cont-search'>
        <input type='text' placeholder='Calcetines,Sudarera,' className='input-search ' />
        <button className='btn-search'>
          <FaSearch />
        </button>
      </form>
    </>
  );
}
