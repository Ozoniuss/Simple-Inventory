import logo from './logo.svg';
import styles from './App.module.css';
import {PropTypes} from "prop-types";
import {useState, useEffect} from "react"
import AddItem from './AddItem';
import SearchBar from './SearchBar';
import ItemsDisplay from './ItemsDisplay';
import styled from 'styled-components';
import Test from './Class';


// the component must return a jsx element
function App() {
  const [filters, setFilters] = useState({name:"", maxPrice:0, type:"", brand:""});
  const [data, setData] = useState({items: []});
  const [showTest, setShowTest] = useState(true);

  // useEffect(() => {
  //   //for mount and update
  //   console.log("useeffect");

  //   //for cleanup
  //   return () => {
  //     console.log("cleanup");
  //   }
  // }, [])
  //add a dependency list at the end. Empty list means that it runs only once
  //for example [data] will run only when the data variable changes

  useEffect(() => {
    //default is a get request
    fetch("http://localhost:3000/items").then((response) => response.json())
    .then((data) => {setData({items:data})})}, []);

  const addItemToDtata = (item) => {
    let items = data["items"];

    const requestOptions = {
      method: "POST",
      headers: {                               
        "Content-Type": "application/json", // some json data
      
      },
      body: JSON.stringify(item)
    }

    fetch("http://localhost:3000/items", requestOptions).then((response) => response.json())
    .then((item) => { 
      items.push(item)
      setData({items: items})
    }) // send a request to an url
    //then waits for the response to come back
    /*
    get -- get some information (default)
    post -- create/send information to the server
    put -- update something on the server
    delete -- delete something from the server
    */ 
    resetFilters()
  }
    
  const deleteItem = (item) => {
    const items = data["items"];
    const requestOptions = {
      method:"DELETE"
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) =>{
        if (response.ok){
          fetch("http://localhost:3000/items").then((response) => response.json())
    .then((data) => {setData({items:data})})}
        })

      
  }

  const filterData = (data) =>{
      const filteredData = [];

      if (filters.name === "" && filters.maxPrice === 0 && filters.type === "" && filters.brand === ""){
        return data;
      }

      console.log(data);

      for (const item of data){
        if (filters.name !== "" && item.name !== filters.name){
            continue;
          }
          if (filters.maxPrice !== 0 && item.price > filters.maxPrice){
            continue;
          }
          if (filters.type !== "" && item.type !== filters.type){
            continue;
          }
          if (filters.brand !== "" && item.brand !== filters.brand){
            continue;
          }

          filteredData.push(item);
        }

      return filteredData;
  }


  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  }

  const resetFilters = () => {
    setFilters({name:"",maxPrice: 0,type: "",brand:""});
  }

  return (
    <div className="container">
      <div className="row mt-3">
      <ItemsDisplay items={filterData(data["items"])} deleteItem={deleteItem}/>
      </div>
      <div className="row mt-3">
      <SearchBar updateSearchParams={updateFilters} displayAllData={resetFilters}/>
      </div>
      <div className="row mt-3">
      <AddItem addItem={addItemToDtata}/>
      </div>
      {showTest ? <Test destroy={setShowTest}></Test> : null}
    </div>
  );
}


//props are READ ONLY, if you use decomposition they are also modifiable
// function AddItem(props){

//   const value = props.text;
//   if (props.number > 10){
//     return(
//       <form>
//         <label for="text-form">Type something: </label>
//         <input type="text" id="text-form" value = {value}></input>
//       </form>
//     );
//   }
//   else{
//     return(
//       <form>
//         <label for="text-form">Sugemai de pula nu vrei?? </label>
//         <input type="text" id="text-form" value = {value}></input>
//       </form>
//     );
//   }
//   }

// AddItem.defaultProps = {
//   number: 69,
//   text: "default"
// }

// AddItem.propTypes = {
//   number: PropTypes.number
// }

//NOT A COMPONENT! BECAUSE IT DOESN'T RETURN JSX
// function foo(){
//     return "hello!";
// }

export default App;
