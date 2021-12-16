import './App.css';
import { useEffect, useState } from 'react';
import pokeAPI from './utils/pokeapi.js';
import ImageProcessing from './utils/image-processing';
import HomePresenter from './components/presenters/homePresenter';
import PlayPresenter from './components/presenters/playPresenter';
import RegisterPresenter from './components/presenters/registerPresenter';
import RoomPresenter from './components/presenters/roomPresenter'
import JoinViaLinkPresenter from './components/presenters/joinViaLinkPresenter'
import Header from './components/view/header';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App(props) {

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
      <div className="App-body">
        <Router>
          <Header model={props.model} />
          <Routes>
            <Route path="/" element={
              <HomePresenter model={props.model}/>
            } />
            <Route path="/play" element={
              <PlayPresenter model={props.model}/>
            } /> 
            <Route path="/room" element={
              <RoomPresenter model={props.model}/>
            } /> 
            <Route path="/register" element={
              <RegisterPresenter model={props.model}/>
            } /> 
            <Route path="/join" element={
              <JoinViaLinkPresenter model={props.model} />
            } />
          </Routes>
        </Router>
        </div>
    </div>
  );
}

export default App;
