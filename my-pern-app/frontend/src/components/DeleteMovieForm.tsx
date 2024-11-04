import { useState } from "react";

export function DeleteMovieForm(){

    const [movieId, setMovieId] = useState<number>()

    const handleSubmit = async (event: { preventDefault: () => void })=>{
        event.preventDefault()
        try{
            const response = await fetch(`api/deleteMovie/${movieId}`,
                {method: 'DELETE',}
            )
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            alert('MOVIE DELETED SUCCESSFULLY')
            console.log('Movie deleted successfully:', result)
        }
        catch(err){
            console.error('Error deleting movie:',err)
        }
    

        }
    
    return(
        <div className='flex flex-col bg-gray-500 py-2 my-2'>
            <form onSubmit={handleSubmit}>
            <div>
            <label>Movie ID:</label>
            <input type="text" onChange={(e)=>setMovieId(Number(e.target.value))}/>
            </div>
            <button type="submit">Delete Movie</button>
            </form>
        </div>
    )
}