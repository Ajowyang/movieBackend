export function CreateMovieForm(){
    return(
        <div className='flex flex-col bg-gray-500 p-5'>
            <form>
            <div className='flex my-2'>
                <label>Title:</label>
                <input type='text' required/>            </div>
            <div className="flex my-2">
                <label>IMDB Link:</label>
                <input type='text' required/>            </div>
            <div className="flex my-2">
                <label>Rating:</label>
                <input type='number' step='0.1' min='0' max='5'  required/>
            </div>
            <div className="flex my-2">
                <label>Summary:</label>
                <textarea/>
            </div>
            <button type="submit"> Create Movie </button>
            </form>
        </div>
    )
}