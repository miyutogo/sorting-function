import './App.css';
import {useState} from 'react'
import Data from './data.json'
import DataList from './components/DataList'
import SidePanel from './components/SidePanel'
import FilteredList from './components/FilteredList';
import FilterContext from './components/context/FilterContext'

function App() {
  const data = Data

  // set value for context
  const [filterCat, setFilterCat] = useState([])
  const [filterManu, setFilterManu] = useState([])
  const [toggle, setToggle] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [ swtch, setSwtch] = useState(false)
 

  const handleToggle = (e) => {
    if (!toggle){
      setToggle(true)
    } else {
      setToggle(false)
    }
  }

  return (
    <FilterContext.Provider value={{filterCat, setFilterCat, filterManu, setFilterManu, toggle, setToggle, minPrice, setMinPrice,maxPrice, setMaxPrice, swtch, setSwtch, maxPrice, setMaxPrice}}>
      <div className="App">
        <h1>Display, Filter, and Sort</h1>
        <button onClick={handleToggle} >Options</button>
          <DataList products={data} /> 
          { toggle ?  <SidePanel />  : toggle} 
          
      </div>
    </FilterContext.Provider>
  );
}

export default App;
