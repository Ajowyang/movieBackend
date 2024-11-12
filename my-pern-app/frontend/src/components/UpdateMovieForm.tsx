import { useState } from "react";


export function UpdateMovieForm(){
const [movieId, setMovieId] = useState<number>()
const [newTitle, setNewTitle] = useState('')
const [newImdbLink, setNewImdbLink] = useState('')
const [newSummary, setNewSummary] = useState('')
const [newRating, setNewRating] = useState<number>()

const handleSubmit = async(event: { preventDefault: () => void; })=>{
    event?.preventDefault()
    const newMovie = {newTitle, newImdbLink, newSummary, newRating}
    try{
        const response = await fetch(`/api/updateMovie/${movieId}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie),
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

                alert('MOVIE UPDATED SUCCESSFULLY')
                console.log('Movie updated successfully:', result);

    }
    catch(err){
        console.error('Error updating Movie:',err)
    }
}

return(
    <div className='flex flex-col bg-gray-500 p-5 my-2'>
        <form onSubmit={handleSubmit}>
            <div className="flex my-2">
                <label >Movie ID:</label>
                <input type='text' id="movieId"onChange={(e)=>{setMovieId(Number(e.target.value))}} required></input>
            </div>
            <div className="flex my-2">
                <label >New Title:</label>
                <input type='text' id="newTitle"onChange={(e)=>{setNewTitle(e.target.value)}} required></input>
            </div>
            <div className="flex my-2">
                <label >New IMDB Link:</label>
                <input type='text' id="newImdbLink"onChange={(e)=>{setNewImdbLink(e.target.value)}} required></input>
            </div>
            <div className="flex my-2">
                <label >New Summary:</label>
                <textarea id="newSummary" onChange={(e)=>{setNewSummary(e.target.value)}} required></textarea>
            </div>
            <div className="flex">
                <label >New Rating:</label>
                <input type='number' id="newRating" onChange={(e)=>{setNewRating(Number(e.target.value))}} step='0.1' min='0' max='5' required></input>
            </div>
            <button type="submit">Update Movie</button>
        </form>
    </div>
)


}