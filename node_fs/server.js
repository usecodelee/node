var http = require('http');
var querystring = require('querystring');
var urllib = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let json = urllib.parse(req.url, true).query;
    if (JSON.stringify(json) != '{}') {
        fs.writeFile(data.name + '.txt', data.pass, function(err) {
            if (err) {
                res.write(err);
            } else {
                res.write('success');
            }
        });
    } else {
        let data = '';
        req.on('data', function(str) {
            data += str;

        });
        req.on('end', function() {
            data = JSON.parse(data);
            fs.writeFile(data.name + '.txt', data.pass, function(err) {
                if (err) {
                    res.write(err);
                } else {
                    res.write('success');
                }
            });

        });

    }
    res.end();


}).listen(8000);