import express, {Request, Response} from 'express';
import mysql from 'mysql';

const app = express();

app.get('/api/characters', (req: Request, res:Response)=> {
    res.send("It works");
})

app.get('/api/characters/:id', (req: Request, res:Response)=> {
    const id = req.params.id;
    res.send("It works for id" + id);
})

const port = process.env.PORT || 3000;
app.listen(port,  () => {
    console.log("Server is running")
})