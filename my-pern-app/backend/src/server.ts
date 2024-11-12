import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import pg from 'pg'
// import { ClientError, errorMiddleware } from './lib/index.js';


const app = express();
const port = process.env.PORT || 5001;
// const pool = new Pool({  user: process.env.DB_USER,  host: process.env.DB_HOST,  database: process.env.DB_NAME,  password: process.env.DB_PASSWORD,  port: Number(process.env.DB_PORT) || 5432,});
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized: false,
    // }
  });

// app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {  res.send('Helo from the backend!');    
});


app.post('/api/createMovie', async (req, res, next)=>{
    try{
        const { title, summary, imdbLink, rating} = req.body;
        if(typeof rating !== 'number'){
            res.status(400).json({ message: 'rating must be a number!' });
        }

        const sql = `
        insert into "movies" ( "title", "summary", "imdbLink", "rating" )
        values($1, $2, $3, $4)
        returning *
        `;
        const result = await db.query(sql, [title, summary, imdbLink, rating ])
        if (result.rows.length === 0) {
            res.status(500).json({ message: 'Error creating movie' });
        }

        res.status(201).json(result.rows[0])
    }
    catch(err){
        next(err)
    }//return status 500 response on my own
})

app.put('/api/updateMovie/:movieId', async (req, res, next)=>{
    try{
        const {movieId} = req.params
        const {newTitle, newSummary, newImdbLink, newRating} = req.body
        if(typeof newRating !== 'number'){
            res.status(400).json({ message: 'new rating must be a number!' });
        }
        const sql = `
        update "movies"
        set "title" = $2,
            "summary" = $3,
            "imdbLink" = $4,
            "rating" = $5
        where ("movieId" = $1)
        returning *
        `;
        const result = await db.query(sql, [movieId, newTitle, newSummary, newImdbLink, newRating])
        res.json(result.rows[0])
    }
    catch(err){
        next(err)
    }
})

app.delete('/api/deleteMovie/:movieId', async (req, res, next)=>{
    try{
        const {movieId} = req.params

        if(!Number(movieId)){
            res.status(400).json({ message: 'movieId must be a number!' });
        }
        const sql = `
        delete from "movies"
        where ("movieId" = $1)
        returning *
        `;
        const result = await db.query(sql, [movieId]);
        if (result.rows.length === 0) {
            res.status(500).json({ message: 'Error deleting movie' });
        }
        res.status(204).json()
    }
    catch(err){
        next(err)
    }
})

app.get('/api/getMovies', async(req, res, next)=>{
    try{
        const sql=`
        select * from "movies"
        `;
        const result = await db.query(sql)
        res.json(result.rows)
    }
    catch(err){
        next(err)
    }
})

app.listen(port, () => {  console.log(`Server is running on http://localhost:${port}`);
});