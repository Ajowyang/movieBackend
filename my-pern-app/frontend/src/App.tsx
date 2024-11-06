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
  <MovieList/>
  <CreateMovieForm/>
  <UpdateMovieForm/>
  <DeleteMovieForm/>

  </>
  ;
}

export default App
