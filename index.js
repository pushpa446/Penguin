const express = require('express');
const app = express();
var https = require('http');

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))

var optionsget = {
    host : '127.0.0.1',
    port : 3001,
    path : '/users',
    method : 'GET'
};

var reqGet = https.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    res.on('data', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');
    });

});

reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});