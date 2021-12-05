import './App.css';
import { useEffect, useState } from 'react';
import pokeAPI from './utils/pokeapi.js';
import ImageProcessing from './utils/image-processing';
//import DatabaseHandler from './utils/database-handler'
import HomePresenter from './components/presenters/homePresenter';
import PlayPresenter from './components/presenters/playPresenter';
import RoomSelectorPresenter from './components/presenters/roomSelectorPresenter';
import Header from './components/view/header';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {

  const [imageData, setImageData] = useState();
  const [modifiedImageData, setModifiedImageData] = useState();

  useEffect(() => {
    pokeAPI.getPokemon(4).then(res => {
      const img = res.data.sprites.other["official-artwork"]["front_default"];
      setImageData(img);
      ImageProcessing.getImageInSolidColor(img, 111, 111, 111).then(imgData => {
        setModifiedImageData(imgData);
      })
    })
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={imageData}  />
        <img src={modifiedImageData}  />
      </header>
      <div className="App-body">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={
              <HomePresenter />
            } />
            <Route path="/play" element={
              <PlayPresenter />
            } /> 
            <Route path="/rooms" element={
              <RoomSelectorPresenter />
            } /> 
          </Routes>
        </Router>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 
        </a>
        </div>
    </div>
  );
}

export default App;
