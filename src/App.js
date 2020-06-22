//Created By Alex Setia
//June 22, 2020
//Devware

import React from 'react';
import axios from 'axios';
import './App.css';
import "./Search.css";

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
          // return <Habit data={singleHabit} />;
          // return <p> {item} </p>
          console.log(item)
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

   {searchedBool ? listOfSearchResults : <div> </div>}

</div>
      </header>
    </div>
  );
}

export default App;