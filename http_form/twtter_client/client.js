require('http').request({
    host:'127.0.0.1',
    port:3000,
    url:'/',
    method:'GET'
},function(res){
    var body='';
    res.setEncoding('utf8');
    res.on('data',function(data){
        body+=data;
    });
    res.on('end',function(){
        console.log(body);
    });
}).end();