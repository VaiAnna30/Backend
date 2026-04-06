const express = require("express");
const users=require('./MOCK_DATA.json');
const app=express();

app.get("/",(req,res)=>{
    return res.send("This is the Home Page");
})

app.get("/users",(req,res)=>{
    const html=`
    <ul>
        ${users.map((user)=>{
            return `<li>${user.first_name}</li>`;
        }).join('')}
    </ul>
    `
    /* 
    Backticks allow multiline strings. We can use ${} to insert Javascript.
    We are using map to loop through the users and create a list item for each user 
    and then we are joining the list items to create a single string which is the html
    that we will send to the client.
    .join('') is used to join the array of list items into a single string without any separator.
    */
    
    return res.send(html);
})

app.post("/users",(req,res)=>{
    // create new user
    const body=req.query.name;
    return res.json({status: "pending"})
})

app.listen(8000,()=>console.log("Server started at port number 8000"));