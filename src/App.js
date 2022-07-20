import {useState, useEffect} from 'react';

import logo from './logo.svg';
import './App.css';

import Navigation from './necessaries/Navigation';
import Canvas from './necessaries/Canvas';

const currentUser = {
  id: 1,
  name: "jd4rider",
  username: 'jd4rider'
}


function App() {
  const [canvases, setCanvases] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [currentCanvas, setCurrentCanvas] = useState({
    id: 0,
    title: "Please select a canvas from the dropdown menu",
    ownerid: currentUser.id,
  });
  useEffect(() => {
    fetch(`http://localhost:3001/canvases?ownerid=${currentUser.id}`)
          .then(res => res.json())
          .then(data => setCanvases(data))
          .catch(err => console.log(err))
    fetch(`http://localhost:3001/baskets?canvasid=${currentCanvas.id}&ownerid=${currentUser.id}`)
          .then(res => res.json())
          .then(data => setBaskets(data))
          .catch(err => console.log(err));
  }, [currentCanvas] );
  return (
    <div>
      <Navigation baskets={baskets} canvases={canvases} currentUser={currentUser} setCanvases={setCanvases} setCurrentCanvas={setCurrentCanvas}/>
      <Canvas baskets={baskets} currentCanvas={currentCanvas} currentUser={currentUser}/>
    </div>
  );
}

export default App;
