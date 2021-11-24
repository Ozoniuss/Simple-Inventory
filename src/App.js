import { useState, useEffect } from "react"
import AddItem from './AddItem';
import SearchBar from './SearchBar';
import ItemsDisplay from './ItemsDisplay';


function App() {
  const [filters, setFilters] = useState({ name: "", maxPrice: 0, type: "", brand: "" });
  const [data, setData] = useState({ items: [] }); // probably a list would have worked better

  useEffect(() => {
    //default is a get request
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => { setData({ items: data }) })
      .catch(error => { console.log(error.toString()) })
  }, []);

  const addItemToDtata = (item) => {
    let items = data["items"];

    // set the request options for a post request when adding to the database
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // some json data
      },
      body: JSON.stringify(item)
    };

    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((item) => {
        items.push(item)
        setData({ items: items })
      })
      .catch(error => { console.log(error.toString()) });

    resetFilters();
  }

  const deleteItem = (item) => {

    //set request options for a delete method
    const requestOptions = {
      method: "DELETE"
    };

    //delete the item from the database when pressing the delete button
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          fetch("http://localhost:3000/items")
            .then((response) => response.json())
            .then((data) => { setData({ items: data }) })
        }
      })
      .catch(error => { console.log(error.toString()) });

  }

  const filterData = (data) => {
    const filteredData = [];

    //no filters
    if (filters.name === "" &&
      filters.maxPrice === 0 &&
      filters.type === "" &&
      filters.brand === "") {
      return data;
    }

    // find the items that satisfy the filters
    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        continue;
      }
      if (filters.maxPrice !== 0 && item.price > filters.maxPrice) {
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type) {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        continue;
      }

      filteredData.push(item);
    }

    return filteredData;
  }


  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  }

  // just set the filters to the empty values
  const resetFilters = () => {
    setFilters({ name: "", maxPrice: 0, type: "", brand: "" });
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay items={filterData(data["items"])} deleteItem={deleteItem} />
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} displayAllData={resetFilters} />
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToDtata} />
      </div>
    </div>
  );
}

export default App;
