import logo from './logo.svg';
import './App.css';
import Jimp from 'jimp';
import { useEffect, useState } from 'react';

function App() {

  const [imgData, setImageData] = useState()

  useEffect(() => {
    Jimp.read("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png").then(image => {

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
          image.bitmap.data[idx] = 86;
          image.bitmap.data[idx + 1] = 101;
          image.bitmap.data[idx + 2] = 115;
          image.bitmap.data[idx + 3] = image.bitmap.data[idx + 3];
      });
      image.getBase64Async(Jimp.MIME_PNG).then(newImage => { 
        let tag = document.createElement("img");
        setImageData(newImage);
      })
    })  
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" />
        <img src={imgData}  />
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
      </header>
    </div>
  );
}

export default App;
