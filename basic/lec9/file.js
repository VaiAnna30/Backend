const http=require("http");
const fs=require("fs");
const url=require("url");

const server=http.createServer((req,res)=>{
    if(req.url=="/favicon.ico") return res.end();
    myurl=url.parse(req.url,true);

    const log=`New request is received at ${myurl.pathname}`;
    fs.appendFile("newfile",log,(err,data)=>{
        switch(myurl.pathname){
            case "/":
                res.end("This is the home page");
                break;
            case "/Contact":
                res.end("This is the contact Page");
                break;
            case "/about":
                const child=myurl.query.child;
                const parent=myurl.query.parent;
                res.end(`This is the about page having child as ${child} and parent as ${parent}`);
                break;
            default:
                res.end("Error 404");
        }
    })
})

server.listen(8000,()=>console.log("Server started at port number 8000"));