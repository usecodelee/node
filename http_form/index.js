var http=require('http');
var qs=require('querystring');


var server=http.createServer(function(req,res){
    let formHtml=`<form action='/url' method='POST'>
                <label for="name">name:</label>
                <input id="name" type="text" name="name">
                <input type="submit">
                </form>`;
    res.writeHead(200,{'Content-Type':'text/html'});

    if(req.url=='/'){
        res.end(formHtml);
    }else if(req.url=='/url' && req.method=='POST'){
        var body='';
        req.on('data',function(data){
            body+=data;
        });
        req.on('end',function(){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('data:'+qs.parse(body).name);
        });
    }else{
        res.writeHead(404);
        res.end('NOT FOUND');
    }
    
    
    
});
server.listen(3000);