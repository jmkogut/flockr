#!/usr/bin/env nodejs

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

    app.listen( 8080 );

io.static.add('two.js', {file: 'lib/two.js/build/two.js'});
io.static.add('util.js', {file: 'lib/util.js'});
io.static.add('keypress.js', {file: 'lib/keypress/keypress.js'});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  io.sockets.emit('welcome', { msg: 'locations provided'});

  socket.on('update', function (from, loc) {
    console.log('loc update', from, ' saying ', loc);
    io.sockets.emit('update', {from: from, loc: loc});
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});
