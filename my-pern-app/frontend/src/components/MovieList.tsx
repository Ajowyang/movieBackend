
import {useCallback, useEffect, useState} from 'react'
import { Movie } from '../lib/data'

export function MovieList(){
    const [movies, setMovies] = useState<Movie[]>()
    const [error, setError] =useState<unknown>()
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = useCallback(async()=>{
        try{
            const response = await fetch(`/api/getMovies`);
            if(!response.ok){
                throw new Error(`HTTP error! Status:${response.status}`)
            }
            console.log('before data set ')
            const data = (await response.json()) as Movie[]
            console.log('???')
            setMovies(data)
            console.log(`data movies: ${movies}`)
        }
        catch(err){
            console.error(err)
            setError(err)
        }finally{
            setIsLoading(false)
        }
    }, [])

    useEffect(()=>{ 
        fetchData()
    }, [movies])

    if(isLoading){
        return<div>Loading...</div>
    }
    if(error){
        return <div>Error...</div>
    }

    return (

    <div className='flex flex-col'>
        <h1>MOVIES</h1> 
        <table className='border'>
            <thead>
                <tr>
                    <th className='border'>MovieId</th>
                    <th className='border'>Title</th>
                    <th className='border'>Imdb Link</th>
                    <th className='border'>Summary</th>
                    <th className='border'>Rating</th>
                </tr>
                {movies?.map((movie, index)=>(
                    <tr key={index}>
                        <th className='border'>{movie.movieId}</th>
                        <th className='border'>{movie.title}</th>
                        <th className='border'>{movie.imdbLink}</th>
                        <th className='border'>{movie.summary}</th>
                        <th className='border'>{movie.rating}</th>
                    </tr>
                ))}
            </thead>
        </table>
        
    </div>)
}