var http = require("http");
var request = require("request");

var dataMap = new Map();
var urlList = []
http.createServer(function(req,res){
    console.log(req.url);   
    // req.pipe(request({
    //     method:'GET',
    //     url:req.url,
    // },function(err,data){console.log(data.body)}
    // )).pipe(res);
    //urlList.push(req.url);
    if(req.method == "GET")
    {
        req.pipe(request({
            method:'GET',
            url:req.url,
        },function(err,data){
            //console.log(data.request.href);
            dataMap.set(data.request.href,data.body);
        })).pipe(res);
    }
    if(req.method == "POST")
    {
        req.pipe(request({
            method:'POST',
            url:req.url,
        },function(err,data){
            dataMap.set(data.request.href,data.body);
        })).pipe(res);
    }

    //console.log("url = " + dataMap[]);
    // res.writeHead(200,{'Content-Type':'text/plain'});
    // res.end('Hello World\n');
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');