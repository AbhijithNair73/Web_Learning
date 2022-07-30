const http = require ('http');
var staff = require('./data/staff.json');
const path = require('path');

const server = http.createServer((req,res) => {
    let result = req.url.includes("react");
    console.log('req.url: ',req.url);
    let newreq = path.basename(req.url);
    console.log('new req: ',newreq);
    if(req.url == '/')
    {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json");
        res.end(JSON.stringify(staff));
    }
    else
    {

        var data = staff.filter((item)=>{
            // let temp = item.language;
            // console.log(temp);
            return item.language.includes(newreq);
        });
        console.log("Data: ",data);
        if(data.length === 0)
        {
            res.writeHead(404, {"Content-Type":"text/html" });
            res.end("<h1>404 <br>No data found</h1>");
        }
        else{
            res.writeHead(200, {"Content-Type" : "text/json" });
            res.end( JSON.stringify(data));
        }
    }
    
});

server.listen(9500, () => console.log("Server listening on port : 9500"));