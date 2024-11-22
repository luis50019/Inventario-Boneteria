import HomePage from './pages/Home';
import Inventary from './pages/Inventary';
import NavBar from './components/NavBar';
function App() {
  
  return (
   <div className='cont border-2 pl-5 pt-5 relative'>
    <HomePage />
    <NavBar/>
   </div>
  )
}

export default App
