//Created By Alex Setia
//June 22, 2020
//Devware

import React from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import './App.css';
import "./Search.css";
import "./List.css";

function App() {

  //---------------------STATES-------------------------//
  let [searchTerm, setSearchTerm] = React.useState('');
  let [searchedBool, setSearchedBool] = React.useState(false);
  let [searchResults, setSearchResults] = React.useState([]);
    //----------------------------FUNCTIONS-----------------------------------//
    function handleInputChange(event) {
      setSearchTerm(event.target.value)
}

    function searchApps(e) {
      e.preventDefault();
      setSearchedBool(true)

      console.log(searchTerm)
      Promise.all([
        Promise.resolve(axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`)),
      ]).then((d) => {
        const data = d[0].data.items
        console.log(data)
        setSearchResults(data);
        })
      }
   
        const listOfSearchResults = searchResults.map((item) => {
          return (

<li class="sub"> 
 <button>{item.id}</button>
</li>
          )
        });
      

//-----------------------HTML DISPLAY------------------------------//

  return (
    <div className="App">
      <header className="App-header">
      <div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={handleInputChange}/>
      <button type="submit" class="searchButton" onClick={searchApps}> 
      🔍
        <i class="fa fa-search"></i>
     </button>
   </div>
   <ul id="menu" >
   {searchedBool ? listOfSearchResults : <div> <h6>Search for any kind of devware you want and then use linux to install it. Powered by github.</h6> </div>}
   </ul>

</div>
      </header>
    </div>
  );
}

export default App;