import express from 'express';
import mongoose from 'mongoose';
const app =  express();

const port = process.env.PORT || 3000;

app.use(express.json());

const start = () => {
    try{
        mongoose.connect(`mongodb+srv://yura:yura12345@cluster0.an8b0.mongodb.net/Auth?retryWrites=true&w=majority`);
        app.listen(port, ()=>{
            console.log(`Server run on port ${port}`)
        });
    }
    catch (e) {
        console.log(e);
    }
}

start();
