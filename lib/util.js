function Rnd(ceil) {
  return Math.floor( Math.random() * ceil );
}

function Eq ( p1, p2 ) {
  return ( p1.x == p2.x && p1.y == p2.y );
}

function Boid () {
  return {
    x: Rnd(200),
    y: Rnd(200)
  };
}

var render = function( frames ) {
  var b = window.player;
  var f = window.two;

  if (window.playerTwo) {
    f.makeCircle(playerTwo.x, playerTwo.y, 10);
  }

  f.clear();
  f.makeCircle(b.x, b.y, 10);  

  if (!Eq( b, window.last) ) {
    SendLocation( b );
  }

  window.last = { x: b.x, y: b.y };
};

function Input () {
  keypress.counting_combo("w", function(e, count) {
        window.player.y -= 1;
        //console.log( window.player );
  });
  keypress.counting_combo("a", function(e, count) {
        window.player.x -= 1;
        //console.log( window.player );
  });
  keypress.counting_combo("s", function(e, count) {
        window.player.y += 1;
        //console.log( window.player );
  });
  keypress.counting_combo("d", function(e, count) {
        window.player.x += 1;
        //console.log( window.player );
  });
}

function Init () {
  Field(); // create two
  Connect(); // connect to io
  Register(); // register player

  window.two.bind('update', render);
}

function Connect() {
  window.sock = io.connect('http://thechex.es:8080');
  window.sock.on('update', PlayerUpdate);
}
function PlayerUpdate(obj){
  if (obj.from != playerId) {
    window.playerTwo = obj.loc;
  }
}

function SendLocation ( ) {
  window.sock.emit('update', playerId, window.player);
}

function Register () {
  window.last = { x:0, y:0 };
  window.player = Boid(); 
  window.playerId = Rnd(200);

  SendLocation( );
  Input();
}

function Field () {
  window.two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);
}
