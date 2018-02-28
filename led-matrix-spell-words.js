var five = require("johnny-five");
var board = new five.Board();

var s = "overpopulation";
for (var i = 0; i < s.length; i++) {
    console.log(s.charAt(i));
}

board.on("ready", function() {

  var heart = [
    "01100110",
    "10011001",
    "10000001",
    "10000001",
    "01000010",
    "00100100",
    "00011000",
    "00000000"
  ];

  var matrix = new five.Led.Matrix({
    addresses: [0x70],
    controller: "HT16K33",
    rotation: 3,
  });

  matrix.clear();
  matrix.draw(heart);
  matrix.draw("A");
  matrix.draw("B");
  matrix.draw("C");
  matrix.draw("D");
  matrix.draw("E");
  matrix.draw("F");
  matrix.draw("G");
  matrix.draw("H");
  matrix.draw("I");
  matrix.draw("J");
  matrix.draw("K");
  matrix.draw("L");
  matrix.draw("M");
  matrix.draw("N");
  matrix.draw("O");
  matrix.draw("P");
  matrix.draw("Q");
  matrix.draw("R");
  matrix.draw("S");
  matrix.draw("T");
  matrix.draw("U");
  matrix.draw("V");
  matrix.draw("W");
  matrix.draw("X");
  matrix.draw("Y");
  matrix.draw("Z");
});