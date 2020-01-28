var http = require("http");
var request = require("request");
var fs = require('fs');

var dataMap = new Map();
http.createServer(function(req,res) {
    if(req.url == '/public') {
        var file = "/Users/liuyuxi/Workshop/whistleLearn/whistleLearn/public.crt";
        fs.readFile(file , function(err,data){
            if (!err) {
                res.writeHeader(200,{
                    'Content-Type': 'application/force-download',
                    'Content-Disposition': 'attachment; filename=public.crt',         
                  });           
                  res.write(data);//将index.html显示在客户端           
                  res.end();
            }
        });
    } else {
        console.log(JSON.stringify({"type": "req", "method":req.method,"url":req.url}));
        req.pipe(request({
            method:req.method,
            url:req.url,
        },function(err,data){
            dataMap.set(data.request.href,{"requestHeader":data.request.headers, "statusCode": data.statusCode, "responseHeader":data.headers,"body":data.body});
        })).pipe(res);
    //console.log(JSON.stringify({"type": "map", "value": JSON.stringify([...dataMap])}));
}}).listen(3000);
