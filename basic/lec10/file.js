const express = require('express');

const app=express();

app.get('/',(req,res)=>{
    return res.send("This is the home page");
})

app.get('/about',(req,res)=>{
    return res.send(`This page is having child as ${req.query.child} and parent as ${req.query.parent}`);
})

app.listen(8000,()=>console.log("Server started at port number 8000"));