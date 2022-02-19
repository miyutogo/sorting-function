import {useState, useMemo, useContext, useEffect} from 'react'
import '../App.css';
import data from '../data.json'
import FilterContext from './context/FilterContext'
import Display from './Display'

function DataList () {
  let allData = data
  
  const [sortConfig, setSortConfig] = useState(null)
  const [filterConfig, setFilterConfig] = useState(null)
  const {filterCat, filterManu, minPrice, swtch, setSwtch, maxPrice} = useContext(FilterContext);

  const sortedItems = useMemo(() => {
    let sortableItems = [...allData]
    
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0;
      });
    }
    return sortableItems
  }, [allData, sortConfig])

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    } else if (
      filterConfig &&
      filterConfig.key === key &&
      filterConfig.direction === 'ascending'
    ){
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setFilterConfig({ key, direction });

  }

  
  const getSorted = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

 
  
  const filteredCat = data.filter((item) => filterCat.some(value => item.category.includes(value)))

  const filteredPrice = data.filter((item) => item.price > minPrice && item.price < maxPrice)


  
  const filteredManu = data.filter((item) => filterManu.some(value => item.manufacturer.includes(value)))
  
  const newArray = filteredCat.concat(filteredManu)

  const newArray2 = newArray.concat(filteredPrice)


  const filteredData = Array.from(new Set(newArray2.map(item => item)))
    .map(row => {
      return newArray2.find(item => item === row)
    })

  let fData = filteredData

  const sortedFiltered = useMemo(() => {
    let sortFiltered = [... fData]

    if (filterConfig !== null) {
      sortFiltered.sort((a, b) => {
        if (a[filterConfig.key] < b[filterConfig.key]) {
          return filterConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[filterConfig.key] > b[filterConfig.key]) {
          return filterConfig.direction === 'ascending' ? 1 : -1
        }
        return 0;
      });
    }
    
    return sortFiltered

    
  }, [fData, filterConfig])


  const sortFilter = sortedFiltered.map((item, key) => {
        return (
           <Display item={item} key={key} />
        )
      }) 

  const sortData =  sortedItems.map((item,key) => {
    return(
      <Display item={item} key={key} />
    )
  })

  console.log(sortFilter)
  useEffect ((e) => {
    if(sortedFiltered === [] || sortedFiltered === undefined){
      setSwtch(false)
    }
    console.log('yipie')
  },[sortFilter])
 


  return (
    <div>

        <table>
        <thead>
            <tr>
            <th>
                <p
                type="button"
                onClick={() => requestSort('category')}
                className={getSorted('category')}
                >
                Category
                </p>
            </th>
            <th>
                <p
                type="button"
                onClick={() => requestSort('price')}
                className={getSorted('price')}
                >
                Price
                </p>
            </th>
            <th>
                <p
                type="button"
                onClick={() => requestSort('manufacturer')}
                className={getSorted('manufacturer')}
                >
                Manufacturer
                </p>
            </th>
            <th>
                <p
                type="button"
                onClick={() => requestSort('createdAt')}
                className={getSorted('createdAt')}
                >
                Production Date
                </p>
            </th>
            </tr>
        </thead>
        <tbody>
            { swtch ? sortFilter : sortData}

        </tbody>
        </table>
    </div>
  );
};

export default DataList