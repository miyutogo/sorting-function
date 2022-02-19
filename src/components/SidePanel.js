import {useContext} from 'react'
import FilterContext from './context/FilterContext'
import data from '../data.json'
import '../App.css';

function SidePanel() {
  const {filterCat, setFilterCat, filterManu, setFilterManu, minPrice, setMinPrice,maxPrice, setMaxPrice, swtch,setSwtch, toggle, setToggle} = useContext(FilterContext);

  const sample = data
  const newData = Array.from(new Set(sample.map(item => item.category))).map(category => {
    return sample.find(item => item.category === category)
  })


  let checkedCat,checkedManu
    
   const changeMinPrice = (e) => {
    setMinPrice(e.target.value)
  }

  const changeMaxPrice = (e) => {
    setMaxPrice(e.target.value)
  } 
  
const handleApplyFilter = (e) => {
  getCatValue(e)
  getManuValue(e)
  
  if (filterCat == [] && filterManu == [] && minPrice == 0 && maxPrice == 0){
    setSwtch(false)
  } else {
    setSwtch(true)
  }
}

  const getCatValue = (e) => {
    const checkedCat = e.target.checked
    const checkedName = e.target.name;
      if( checkedCat == true) {
        setFilterCat(filterCat => [...filterCat, checkedName])
      } else {
        filterCat.pop(checkedName)
     }
  }

  const getManuValue = (e) => {
    const checkedManu = e.target.checked
    const checkedName = e.target.name;
      if( checkedManu == true) {
        setFilterManu(filterManu => [...filterManu, checkedName])
      } else {
        filterManu.pop(checkedName)
      }
  }


 
  const clearFilters = (e) => {
    setFilterCat([])
    setFilterManu([])
    setSwtch(false)
    
  }

  const handleToggle = (e) => {
    setToggle(false)
  }


  return (
    <div className="sidePanelContainer">
        
        <div className="flexItem">
          <p>Category</p>
          <div className="flexWrapper " >
              {newData.map((item) => (
                <div className="flexRowContainer">
                  <input type="checkbox" name={item.category} onChange={getCatValue}/><p>{item.category}</p>
                </div>
              ))}
           </div>
        </div> 
       <div>
          <p>Price Range</p>
          <div className="flexRowContainer">
              <input type='range' min={0} max={100000} step={500} onChange={changeMinPrice} value={minPrice}/>
              <p>{minPrice}</p>
          </div>
          <div className="flexRowContainer">
              <input type='range' min={0} max={100000}  step={500} onChange={changeMaxPrice} value={maxPrice}/>
              <p>{maxPrice}</p>
          </div>
        </div> 
        <div className="flexItem">
          <p>Manufacturer</p>
          <div className="flexWrapper">
              {newData.map((item) => (
                <div className="flexRowContainer">
                  <input type="checkbox" name={item.manufacturer} onChange={getManuValue}/><p>{item.manufacturer}</p>
                </div>
              ))}
          </div>
         
        </div>
        <button onClick={clearFilters}>Clear Filters</button>
        <button onClick={handleApplyFilter}>Apply Filters</button>
        <button onClick={handleToggle}>Close Panel</button>


     </div>
  )
}

export default SidePanel