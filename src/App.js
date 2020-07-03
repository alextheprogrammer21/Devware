//Created By Alex Setia
//June 22, 2020
//Devware

import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./Search.css";
import "./List.css";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AboutInfo from "./AboutInfo"
function App() {

  //---------------------STATES-------------------------//
  let [searchTerm, setSearchTerm] = React.useState('');
  let [searchedBool, setSearchedBool] = React.useState(false);
  let [searchResults, setSearchResults] = React.useState([]);
  const [show, setShow] = React.useState(false);
    //----------------------------FUNCTIONS-----------------------------------//
    function handleInputChange(event) {
      setSearchTerm(event.target.value)
}

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

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
<header class="header">
  <a href="" class="logo">Devware</a>
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul class="menu">
    <li onClick={handleShow}><a href="#about">About</a></li>
  </ul>
</header>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Devware</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can purchase software for various needs. There's also been freeware that you can download for free. When I started programming, I created a lot of applications that could be useful for others around the globe, but was instead just put on github and forgotten about except on a resume. The case was the same for thousands of other developers on github. That's why Devware was born. Devware is a search tool to find programs that people have put in time and effort into making for various reasons and allows other who aren't as familiar with github to download it with a simple click of a button. It's free but it's not exactly freeware. It has the functionality of software but it's not exactly software. It's developer ware, or devware.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div class="wrap">
      <div id="DIV_3">
			<img src="https://raw.githubusercontent.com/alextheprogrammer21/Images/master/Devware-Logo.png" alt="Devware" id="IMG_4" />
		</div>


       <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={handleInputChange}/>
      <button type="submit" class="searchButton" onClick={searchApps}> 
        <i class="fa fa-search"></i>
        🔍
     </button>
   </div>

   
   <ul id="menu" >
   {searchedBool ? listOfSearchResults : <div> </div>}
   </ul>
</div>

<div class="footer">© 2020, Built by me using React :) </div>
    </div>
  );
}

export default App;