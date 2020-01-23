var http = require("http");
var request = require("request");

var dataMap = new Map();
http.createServer(function(req,res){
    console.log(JSON.stringify({"type": "req", "method":req.method,"url":req.url}));
    if(req.method == "GET")
    {
        req.pipe(request({
            method:'GET',
            url:req.url,
        },function(err,data){
            dataMap.set(data.request.href,{"requestHeader":data.request.headers, "statusCode": data.statusCode, "responseHeader":data.headers,"body":data.body});
        })).pipe(res);
    }
    if(req.method == "POST")
    {
        req.pipe(request({
            method:'POST',
            url:req.url,
        },function(err,data){
            dataMap.set(data.request.href,{"requestHeader":data.request.headers, "statusCode": data.statusCode, "responseHeader":data.headers,"body":data.body});
        })).pipe(res);
    }

    console.log(JSON.stringify({"type": "map", "value": JSON.stringify([...dataMap])}));
    // res.writeHead(200,{'Content-Type':'text/plain'});
    // res.end('Hello World\n');
}).listen(3000);

//console.log('Server running at http://127.0.0.1:3000/');