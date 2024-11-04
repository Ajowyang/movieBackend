import { useState } from "react"

export function CreateMovieForm(){

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [imdbLink, setImdbLink] = useState('')
    const [rating, setRating] = useState(0.0)

    const handleSubmit = async(event: { preventDefault: () => void })=>{
        event.preventDefault();
        const movie = { title, summary, imdbLink, rating };

        try{
            const response = await fetch('/api/createMovie',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie),
                });
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                alert('MOVIE CREATED SUCCESSFULLY')
                console.log('Movie created successfully:', result);
        }
        catch(err){
            console.error('Error creating movie:', err)

        }
    } 

    return(
        <div className='flex flex-col bg-gray-500 p-5 my-2'>
            <form onSubmit={handleSubmit}>
            <div className='flex my-2'>
                <label>Title:</label>
                <input type='text' id='title' onChange={(e)=>{setTitle(e.target.value)}} required/>            
                </div>
            <div className="flex my-2">
                <label>IMDB Link:</label>
                <input type='text' id='imdbLink' onChange={(e)=>{setImdbLink(e.target.value)}} required/>            </div>
            <div className="flex my-2">
                <label>Rating:</label>
                <input type='number' id='rating'  onChange={(e)=>{setRating(Number(e.target.value))}} step='0.1' min='0' max='5'  required/>
            </div>
            <div className="flex my-2">
                <label>Summary:</label>
                <textarea id='summary' onChange={(e)=>{setSummary(e.target.value)}}/>
            </div>
            <button type="submit"> Create Movie </button>
            </form>
        </div>
    )
}