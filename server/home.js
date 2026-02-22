const http=module.require("http")
const fs=module.require("fs")

const server=http.createServer((req,res)=>{
    const log=`New Req is received at ${Date.now()} from ${req.url} \n`
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(req.url){
            case "/": 
                res.end("This is Home Page");
                break;
            
            case "/contact":
                res.end("This is Contact Page");
                break;

            default:
                res.end("Error 404");
        }
    })
})

server.listen(8000,()=> console.log(`Hello Server`));