import React, {useEffect, useState } from 'react'
import './App.css'
import { fetchGreeting } from './services/api';
import { CreateMovieForm } from './components/CreateMovieForm';
import { MovieList } from './components/MovieList';
import { DeleteMovieForm } from './components/DeleteMovieForm';
import { UpdateMovieForm } from './components/UpdateMovieForm';


function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchGreeting().then(setGreeting);
  }, []);


  return <>
  {/* <div className="text-center text-xl">{greeting}</div>
  <h1>frontend header</h1> */}
  <MovieList/>
  <CreateMovieForm/>
  <UpdateMovieForm/>
  <DeleteMovieForm/>

  </>
  ;
}

export default App
