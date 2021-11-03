import express from 'express';
import mongoose from 'mongoose';
import authRole from './AuthRotes';

const port = process.env.PORT || 3000;

const app =  express();

app.use(express.json());
app.use("/auth", authRole);

const start = () => {
    try{
        mongoose.connect(`mongodb+srv://yura:yura12345@cluster0.an8b0.mongodb.net/Auth?retryWrites=true&w=majority`);
        
        app.get('/',function(req,res,next){
            res.send('Hi')
            next();
        });
        
        let myFun = function(req,res,next){
            console.log("New server reload");
            next();
        }

        app.use(myFun);

        app.listen(port, ()=>{
            console.log(`Server run on port ${port}`)
        });

        
    }
    catch (e) {
        console.log(e);
    }
}

start();
