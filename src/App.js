import {useState, useEffect} from 'react';

import logo from './logo.svg';
import './App.css';

// Importing Authentication
import { AuthProvider } from 'react-auth-kit'
import { useIsAuthenticated } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';

import Navigation from './necessaries/Navigation';
import NavigationNoAuth from './necessaries/NavigationNoAuth';
import Canvas from './necessaries/Canvas';

import Login from './login/Login';
import Signup from './login/Signup';

import { Button } from 'react-bootstrap';

import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";

const AuthApp = () => {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated()
  const [canvases, setCanvases] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 0,
  });
  const [basketcount, setBasketcount] = useState(0);
  const [currentCanvas, setCurrentCanvas] = useState({
    id: 0,
    title: "Please select a canvas from the dropdown menu",
    ownerid: currentUser.id,
  });

  const getEverything = () => {
    if(isAuthenticated()){
      setCurrentUser({id: auth().id});

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth().token}` 
    }
    
    fetch(`http://localhost:3001/canvases?ownerid=${currentUser.id}`,
          { headers : headers })
          .then(res => res.json())
          .then(data => setCanvases(data))
          .catch(err => console.log(err))
    fetch(`http://localhost:3001/baskets?canvasid=${currentCanvas.id}&ownerid=${currentUser.id}`,
          { headers : headers })
          .then(res => res.json())
          .then(data => setBaskets(data))
          .catch(err => console.log(err));
    fetch(`http://localhost:3001/basketcount?ownerid=${currentUser.id}`,
          { headers : headers })
          .then(res => res.json())
          .then(data => setBasketcount(parseInt(data['lengths'])))
          .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    getEverything();

  }, [currentCanvas, canvases] );
  if(isAuthenticated()){
    return (
      <div>
        <Navigation getEverything={getEverything} baskets={baskets} basketcount={basketcount} canvases={canvases} currentUser={currentUser} setCanvases={setCanvases} setCurrentCanvas={setCurrentCanvas}/>
        <Canvas baskets={baskets} currentCanvas={currentCanvas} currentUser={currentUser}/>
      </div>
    );
  } else {
    return (
      <div>
      
      <Router>
          <NavigationNoAuth />
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/' element={<div><h1>Please Signin or Signup</h1></div>} />
          </Routes>
      </Router> 
    </div>
    )
  }
}

const App = () => {
  return (
    <AuthProvider authStorageType = {'localstorage'}
                  authStorageName={'_auth_t'}
                  authTimeStorageName={'_auth_time'}
                  stateStorageName={'_auth_state'}>
      <AuthApp />                
    </AuthProvider>
  )
}

export default App;
