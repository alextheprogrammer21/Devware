//Created By Alex Setia
//June 22, 2020
//Devware

import React from 'react';
import axios from 'axios';
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
        setSearchResults(data);
        })
      }
   
        const listOfSearchResults = searchResults.map((item) => {
          return (

<li class="sub"> 
 <button onClick={() => {window.open(`https://github.com/${item.full_name}/archive/master.zip`)}}>{item.full_name}</button>
</li>
          )
        });
      

//-----------------------HTML DISPLAY------------------------------//

  return (
    <div className="App">
      <header className="App-header">
      <div class="wrap">
        <h1>Devware</h1>
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={handleInputChange}/>
      <button type="submit" class="searchButton" onClick={searchApps}> 
      🔍
        <i class="fa fa-search"></i>
     </button>
   </div>
   <ul id="menu" >
   {searchedBool ? listOfSearchResults : <div> <h6 class='intro'>People make software to sell to you. People make freeware to give away to you. There is also a vast sea of open source
   projects that developers make for various reasons. I call these devwares. Search for any kind of devware you want and then use linux to install it. Powered by github.</h6> </div>}
   </ul>

</div>
      </header>

      <footer>
  <p>Author: Alex Setia </p>
  <p><a href="mailto:abhisetia0@gmail.com.com">abhisetia0@gmail.com</a></p>
</footer>

    </div>
  );
}

export default App;