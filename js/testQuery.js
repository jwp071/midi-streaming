var https = require('https');

var key = 'bbc92761adafc175562d9cdc10d5a170c66a386a';
var token = 'bae73b3462ac03d82c692aeecbda6c2ec6be0302ce32c4942ad31bb9223b952d';

var options = {
    host: 'www.widgety.co.uk',
    port: 443,
    path: '/api/ships.json?app_id=' + key + '&size=small&token=' + token,
    method: 'GET'
};

var returnString = '';

var req = https.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: \n');
    console.log(res.headers);
    res.setEncoding('utf8');
    console.log('BODY: \n');
    res.on('data', function (chunk) {
        returnString += chunk;
        tryToPrintChunk();
    });
});

function tryToPrintChunk(){
    try{
        var outData = JSON.parse(returnString);
        console.log(outData);
    } catch(e){
        console.log('unable to print');
    }
}

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();