const http=require("http");
const fs=require("fs");
const url=require("url");
const server=http.createServer((req,res)=>{
    const log=`New request received from ${req.url} \n`;
    if(req.url=="/favicon.ico")return res.end();
    myurl=url.parse(req.url,true);
    console.log(myurl);
    fs.appendFile("newFile",log,(err,data)=>{
        switch(myurl.pathname){
            case "/":
                res.end("This is the Home Page");
                break;
            case "/contact":
                res.end("This is the contact page");
                break;
            case "/about":
                const child=myurl.query.child;
                const parent=myurl.query.parent;
                res.end(`This is the about page.The child is ${child} and the parent is ${parent}`);
                break;
            default:
                res.end("Error 404");
        }
    })
})

server.listen(8000,()=>console.log("Server Started"));