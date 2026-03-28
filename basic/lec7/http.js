const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    const log=`New rwqis received from ${req.url} \n`;
    fs.appendFile("newFile",log,(err,data)=>{
        switch(req.url){
            case "/":
                res.end("This is the Home Page");
                break;
            case "/contact":
                res.end("This is the contact page");
                break;
            default:
                res.end("Error 404");
        }
    })
})

server.listen(8000,()=>console.log("Server Started"));