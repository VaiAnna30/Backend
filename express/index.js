const express = require("express");

const app=express();

app.get('/',(req,res)=>{
    return res.send("Hello from Home Page");
})

app.get('/about',(req,res)=>{
    return res.send(`This side ${req.query.papa} Father of ${req.query.child}`);
})

app.listen(8000,()=>console.log(`Server is Lintening on Port 8000`))