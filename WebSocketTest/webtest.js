// initialize everything, web server, socket.io, filesystem, johnny-five
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , five = require("johnny-five"),
  board,servo,led,sensor;

board = new five.Board();

// Function to pause code for x milliseconds
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// on board ready
board.on("ready", function() {

  // init a led on pin 13, strobe every 1000ms
  led = new five.Led(13).strobe(1000);


  matrix = new five.Led.Matrix({
    addresses: [0x70],
    controller: "HT16K33",
    rotation: 3,
  });

});

// make web server listen on port 80
app.listen(80);


// handle web server
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


// on a socket connection
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
 
 // if led message received
  socket.on('led', function (data) {
    console.log(data);
     if(board.isReady){    led.strobe(data.delay); } 
  });

   // if led message received
  socket.on('matrix', function (data) {
    console.log(data);
     if(board.isReady){ 

         var str = data.matrixText;
         //Split the data from the text box into an array
         var letters = str.split("");
         // For each entry in the array write it to the console and write it to the matrix display
         letters.forEach(function(value){
         console.log(value);
         matrix.draw(value);
         matrix.clear();
         });
         //After displaying all the characters in the array clear the matrix so that the last letter is cleared
         matrix.clear();
    } 
  });

});