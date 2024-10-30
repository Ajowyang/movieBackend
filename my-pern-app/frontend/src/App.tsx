import React, {useEffect, useState } from 'react'
import './App.css'
import { fetchGreeting } from './services/api';




function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchGreeting().then(setGreeting);
  }, []);


  return <>
  <div className="text-center text-xl">{greeting}</div>
  <h1>frontend header</h1>
  </>
  ;
}

export default App
