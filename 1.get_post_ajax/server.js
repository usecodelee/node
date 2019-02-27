var http = require('http');
var querystring = require('querystring');
var urllib = require('url');

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url) {
        let json = urllib.parse(req.url, true).query;
        if (json.name == 'lee' && json.pass == '123456') {
            res.write('登录成功');

        } else {
            res.write('登录失败');
        }
        res.end();
    } else {
        console.log(222);
        let data = '';
        req.on('data', function(str) {
            data += str;
            console.log(data);
        });
    }


}).listen(8000);