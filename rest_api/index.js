const express=require("express");
const app=express();
const fs=require("fs");
const PORT=8000;
const mongoose=require("mongoose"); 

// Connect to MongoDB
mongoose
.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


// Schema
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    job_title:{
        type:String,
    },
    gender:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=mongoose.model("User",userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/home",async(req,res)=>{
    const alldbuser=await User.find({});
    const html=`
    <ol>
        ${alldbuser.map((user)=>`<li>${user.first_name} - ${user.email}</li>`).join("")};
    </ol>
    `
    return res.send(html);
})

app.get("/api/home",(req,res)=>{
    return res.json(users);
});


app.post("/api/home",async(req,res)=>{
    const body=req.body;
    if(!body||!body.first_name || !body.last_name || !body.email ||!body.gender){
        return res.status(400).json({message:"Please provide all the required fields"});
    }
    const result=await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        job_title:body.job_title,
        gender:body.gender
    });
    console.log(result);
    return res.status(201).json({message:"User created successfully"});
});

app.route("/api/home/:id")
    .get(async(req,res)=>{
        // Here you would typically get the user from your database using the ID
        const id=req.params.id;
        const user=await User.findById(id);
        // user is storing the user object which we found using the id 
        // from the users array.
        if(user){
            return res.json(user);
        }else{
            return res.status(404).json({message:"User not found"});
        }
    })
    .patch(async(req,res)=>{
        const id=req.params.id;
        const user=await User.findByIdAndUpdate(id,req.body,{new:true});
        if(user){
            return res.json(user);
        }else{
            return res.status(404).json({message:"User not found"});
        }
    })
    .delete(async(req,res)=>{
        // Here you would typically delete the user from your database using the ID
        const id=req.params.id;
        const user=await User.findByIdAndDelete(id);
        if(user){
            return res.json({message:"User deleted successfully"});
        }else{
            return res.status(404).json({message:"User not found"});
        }
    });

app.listen(PORT,()=>console.log(`Server is Running at Port Number ${PORT}`));