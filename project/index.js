const express = require('express');
const users=require('./MOCK_DATA.json')
const app=express();
const PORT=8000;

app.get('/api/users',(req,res)=>{
    res.json(users);
});


// When we will go to users route we will first create a html list and then we will loop 
// through the users and create a list item for each user and then we will join the list
// items and then we will send the html to the client

app.get('/users',( req,res)=>{
    const html=`
    <ul>
        ${users.map((user)=>{
            return `<li>${user.first_name}</li>`;
        }).join('')}
    </ul>
    `;
    res.send(html);
});

// Dynamic route to get user by id
// For creating dynamic route we will use :id in the route and then we will get the id from 
// the req.params and then we will find the user with that id and then we will send the user 
// to the client

// To edit or delete a user we will use the same route but with different HTTP methods 
// (PATCH for edit and DELETE for delete)

app.route(`/api/users/:id`)
    .get((req,res)=>{
        const id=Number(req.params.id);
        const us=users.find(user=>user.id===id);
        return res.json(us);
    })
    .patch((req,res)=>{
        // Edit user with ID
        return res.json({status:"Pending"});
    })
    .delete((req,res)=>{
        // Delete user with ID
        return res.json({status:"Pending"});
    })


// Post request to add a new user
app.post(`/api/users`,(req,res)=>{
    // create new user
    const body=req.body;
    
    return res.json({status: "pending"})
})


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));