function Rnd(ceil) {
  return Math.floor( Math.random() * ceil );
}

function Eq ( p1, p2 ) {
  return ( p1.x == p2.x && p1.y == p2.y );
}

function Location () {
  return {
    x: window.av.translation.x,
    y: window.av.translation.y
  };
}

function Input () {
  keypress.counting_combo("w", function(e, count) {
        window.av.translation.y -= 1;
  });
  keypress.counting_combo("a", function(e, count) {
        window.av.translation.x -= 1;
  });
  keypress.counting_combo("s", function(e, count) {
        window.av.translation.y += 1;
  });
  keypress.counting_combo("d", function(e, count) {
        window.av.translation.x += 1;
  });
}

function GameLoop ( frames ) {
  if (!Eq(window.last, Location()))
    SendLocation();

}

function PlayerUpdate ( dat ) {
  if (dat.from != window.playerId) {
    if (window.other == null) {
      window.other = Avatar(dat.loc);
    } else {
      window.other.translation.x = dat.loc.x;
      window.other.translation.y = dat.loc.y;
    }
  }
  //console.log(dat);
}
function Avatar( loc ) {
  console.log("New avatar.");
  return window.two.makeCircle( loc.x, loc.y, 10 );
}

function Init () { 
  window.playerId = Rnd(200) + "p";
  window.other = null; 
  // create gfx engine
  window.two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);

  // connect to io 
  window.sock = io.connect('http://thechex.es:8080');
  window.sock.on('update', PlayerUpdate);
 
  window.av = Avatar( {x:Rnd(400),y:Rnd(400) });
  Input();

  window.last = Location();

  window.two.bind('update', GameLoop);
}

function SendLocation ( ) {
  window.sock.emit('update', playerId, Location() ); 

  window.last = Location();
}
