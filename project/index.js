const express=require("express");
const app=express();
const fs=require("fs");
const users=require("./MOCK_DATA.json");
const PORT=8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log("Hello");
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from the second middleware");
    return res.end("Response from the second middleware");
});

// This is used when we return the HTML file format
app.get("/home",(req,res)=>{
    const html=`
    <ol>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")};
    </ol>
    `
    return res.send(html);
})

// This is used when we return in the Json format
app.get("/api/home",(req,res)=>{
    return res.json(users);
});

// The above two routes are just for demonstration purposes 
// to show the difference between returning HTML and JSON format. 
// In a real application, you would typically have more meaningful 
// routes and logic to handle the requests. If you are building a 
// RESTful API, you would typically return JSON responses, while 
// if you are building a web application, you would return HTML responses.


// Dynamic Route to get user by id
// app.get("/api/home/:id",(req,res)=>{
//     // Here you would typically get the user from your database using the ID
//     const id=req.params.id;
//     const user=users.find((user)=>user.id===Number(id));
//     // user is storing the user object which we found using the id 
//     // from the users array.
//     if(user){
//         return res.json(user);
//     }else{
//         return res.json(`Error No user found`);
//     }
// });

app.post("/api/home",(req,res)=>{
    // Here you would typically add the new user to your database
    const body=req.body;
    console.log(req.body);
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success",id: users.length});
    });
});


// app.patch("/api/home/:id",(req,res)=>{
//     // Here you would typically update the user in your database using the ID
//     const id=req.params.id;
//     const userIndex=users.findIndex((user)=>user.id===Number(id));
//     if(userIndex!==-1){
//         users[userIndex]={...users[userIndex],...req.body};
//         fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
//             return res.json({status:"Success"});
//         });
//     }else {
//         return res.json({message:"User not found"});
//     }
// });

// app.delete("/api/home/:id",(req,res)=>{
//     // Here you would typically delete the user from your database using the ID
//     const id=req.params.id;
//     const userIndex=users.findIndex((user)=>user.id===Number(id));
//     if(userIndex!==-1){
//         users.splice(userIndex,1);
//         fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
//             return res.json({status:"Success"});
//         });
//     }else {
//         return res.json({message:"User not found"});
//     }
// });

app.route("/api/home/:id")
    .get((req,res)=>{
        // Here you would typically get the user from your database using the ID
        const id=req.params.id;
        const user=users.find((user)=>user.id===Number(id));
        // user is storing the user object which we found using the id 
        // from the users array.
        if(user){
            return res.json(user);
        }else{
            return res.json(`Error No user found`);
        }
    })
    .patch((req,res)=>{
        // Here you would typically update the user in your database using the ID
        const id=req.params.id;
        const userIndex=users.findIndex((user)=>user.id===Number(id));
        if(userIndex!==-1){
            // {...users[userIndex],...req.body} is using the spread 
            // operator to create a new object that combines the 
            // existing user object (users[userIndex]) with the new data 
            // from the request body (req.body).
            users[userIndex]={...users[userIndex],...req.body};
            // here we are updating the user object by merging the existing 
            // user object with the new data from the request body.
            fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
                return res.json({status:"Success"});
            });
        }else {
            return res.json({message:"User not found"});
        }
    })
    .delete((req,res)=>{
        // Here you would typically delete the user from your database using the ID
        const id=req.params.id;
        const userIndex=users.findIndex((user)=>user.id===Number(id));
        if(userIndex!==-1){
            users.splice(userIndex,1);
            fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
                return res.json({status:"Success"});
            });
        }else {
            return res.json({message:"User not found"});
        }
    });

app.listen(PORT,()=>console.log(`Server is Running at Port Number ${PORT}`));