const http=require("http")
const fs=require("fs")
const url=require("url")
const server=http.createServer((req,res)=>{
    if(req.url==`/favicon.ico`) return res.end();
    myurl=url.parse(req.url,true);
    console.log(myurl);
    const log=`request received at ${myurl.pathname}    ${Date.now()}    ${req.method} \n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myurl.pathname){
            case "/": res.end(`Home Page`);
                break;
            case "/about": 
                const ch=myurl.query.child;
                const va=myurl.query.papa;
                res.end(`This is ${ch}'s papa ${va}`)
                break;
            
            case "/signup":
                if(req.method==="GET") res.end(`This is the signup page`);
                else {
                    // DB query which will save the data in database
                    res.end("Success");
                }
            default: res.end(`Error 404`);
        }
    })
});
server.listen(8000,()=>console.log("Server is listening on port 8000"));