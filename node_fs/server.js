var http = require('http');
var querystring = require('querystring');
var urllib = require('url');

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let json = urllib.parse(req.url, true).query;
    if (JSON.stringify(json) != '{}') {
        if (json.name == 'lee' && json.pass == '123456') {
            res.write('登录成功');

        } else {
            res.write('登录失败');
        }
        res.end();
    } else {
        let data = '';
        req.on('data', function(str) {
            data += str;

        });
        req.on('end', function() {
            data = JSON.parse(data);
            if (data.name == 'lee' && data.pass == '123456') {
                res.write('登录成功');

            } else {
                res.write('登录失败');
            }
            res.end();
        });

    }


}).listen(8000);