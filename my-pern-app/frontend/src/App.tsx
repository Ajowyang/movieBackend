import React, {useEffect, useState } from 'react'
import './App.css'
import { fetchGreeting } from './services/api';
import { CreateMovieForm } from './components/CreateMovieForm';



function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchGreeting().then(setGreeting);
  }, []);


  return <>
  <div className="text-center text-xl">{greeting}</div>
  <h1>frontend header</h1>
  <CreateMovieForm/>
  </>
  ;
}

export default App
