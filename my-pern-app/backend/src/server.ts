import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import pg from 'pg'

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const pool = new Pool({  user: process.env.DB_USER,  host: process.env.DB_HOST,  database: process.env.DB_NAME,  password: process.env.DB_PASSWORD,  port: Number(process.env.DB_PORT) || 5432,});
const db = new pg.Pool({
    connectionString: 'postgres://andrewowyang:@localhost/movieDb',
  });

app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {  res.send('Helo from the backend!');    
});
app.listen(port, () => {  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/api/createMovie', async (req, res, next)=>{
    try{
        const { title, summary, imdbLink, rating} = req.body;
        const sql = `
        insert into "movies" ( "title", "summary", "imdbLink", "rating" )
        values($1, $2, $3, $4)
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
        res.json(result.rows)
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
        select * from "movies"
        `;
        const result = await db.query(sql)
        res.json(result.rows)
    }
    catch(err){
        next(err)
    }
})