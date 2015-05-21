// portbridge.js 1.0.0
//   Copyright (c) 2013-2015 Jonathan 'Wolf' Rentzsch: http://rentzsch.com
//   Some rights reserved: http://opensource.org/licenses/mit
//   https://github.com/rentzsch/portbridge.js

var fs = require('fs');
var net = require('net');

var confFilePath = process.argv[2];
require('readline').createInterface({
    input: fs.createReadStream(confFilePath),
    terminal: false
}).on('line', function(line){
    var match = line.match(/^(\d+)\s+([^\s]+)\s+(\d+)/);
    if (match) {
        var localListenPort = match[1];
        var remoteHost = match[2];
        var remotePort = match[3];
        var logString = ''+localListenPort+' => '+remoteHost+':'+remotePort;
    
        net.createServer(function(localSocket){
            var remoteSocket = net.createConnection(parseInt(remotePort), remoteHost, function(){
                localSocket.on('data', function(data){
                    console.log('>> '+logString);
                    remoteSocket.write(data);
                });
                remoteSocket.on('data', function(data){
                    console.log('<< '+logString);
                    localSocket.write(data);
                });
            
                localSocket.on('error', function(err){
                    console.log('ERR local '+err+' '+logString);
                    remoteSocket.end();
                });
                remoteSocket.on('error', function(err){
                    console.log('ERR remote '+err+' '+logString);
                    localSocket.end();
                });
            
                localSocket.on('close', function(err){
                    console.log('close local '+err+' '+logString);
                    remoteSocket.end();
                });
                remoteSocket.on('close', function(err){
                    console.log('close remote '+err+' '+logString);
                    localSocket.end();
                });
            });
        }).listen(parseInt(localListenPort));
        
        console.log('bridging '+logString);
    }
});
