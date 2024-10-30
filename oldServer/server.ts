import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;
const db = new pg.Pool({
    connectionString: 'postgres://ajowyang:@localhost/movieBackend',
  });


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post('/api/createMovie', async (req, res, next)=>{
    try{
        const { title, summary, imdbLink, rating} = req.body;
        const sql = `
        insert into "movies" ( "title", "itemId", "summary", "imdbLink", "rating" )
        values($1, $2, $3, $4, $5)
        returning *
        `;
        const result = await db.query(sql, [title, summary, imdbLink, rating ])
        res.json(result.rows)
    }
    catch(err){
        next(err)
    }
})

app.put('/api/updateMovie/:movieId', async (req, res, next)=>{
    try{
        const {movieId} = req.params
        const {newTitle, newSummary, newImdbLink, newRating} = req.body
        const sql = `
        update "movies"
        set "title" = $2
        set "summary" = $3
        set "imdbLink" = $5
        set "rating" = $5
        where ("movieId" = $1)
        returning *
        `;
        const result = await db.query(sql, [movieId, newTitle, newSummary, newImdbLink, newRating])
        res.json = result.rows
    }
    catch(err){
        next(err)
    }
})

app.delete('/api/deleteMovie/:movieId', async (req, res, next)=>{
    try{
        const {movieId} = req.params
        const sql = `
        delete from "movies"
        where ("movieId" = $1)
        returning *
        `;
        const result = await db.query(sql, [movieId]);
        res.json(result.rows)
    }
    catch(err){
        next(err)
    }
})

app.get('/api/getMovies', async(req, res, next)=>{
    try{
        const sql=`
        selext * from "movies"
        `;
        const result = await db.query(sql)
        res.json = result.rows
    }
    catch(err){
        next(err)
    }
})