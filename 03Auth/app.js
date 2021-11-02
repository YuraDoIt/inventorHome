import express from 'express';
const app =  express();
const port = 8089;

app.get('/', function(req, res){
    res.end("Hello");
});

app.get('/admin', function(req, res){
    res.send("Admin page");
})

app.get('/user', function(req, res){
    res.send('simple user page');
})

app.listen(port, ()=>{
    console.log(`Server run on port ${port}`)
});