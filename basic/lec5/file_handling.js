const fs=require("fs");

// const result=fs.readFileSync("./filee.txt","utf-8");

// console.log(result);

// fs.readFile("./filee.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error is generated" , err);
//     }else{
//         console.log(result);
//     }
// })


// fs.appendFileSync("./filee.txt","Hey hey hey hey");

fs.appendFile("./filee.txt","This is me AS",(err)=>{});