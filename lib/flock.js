// dottru / flock javascript edition
// Maths - http://stackoverflow.com/questions/6963639/sine-and-cosine

function SimLoop ( frames ) {
  // main loop 
  
  //_.each( window.boids, function(e) {
  
}

function Gui () {

  // Global properties object
  function Properties () {
    this.size = 10;
    this.boids = 5;
    this.angle = 0;
    this.x = 50;
    this.y = 50;
  }

  var props = window.props = new Properties();

  var gui = new dat.GUI();
  gui.add(props, 'size');
  gui.add(props, 'boids');
  gui.add(props, 'angle');
  gui.add(props, 'x');
  gui.add(props, 'y');
}

function Init () {
  window.two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);

  Gui();

  MakeBoids();
  
  window.two.bind('update', SimLoop );
  console.log("Initialised.");
}

function MakeBoids () {
  var bounds = Bounds();

  window.boids = _.map( _.range(0, window.props.boids),
          function(e) {
            return new Boid( Rnd(bounds.x), Rnd(bounds.y) );
          } );
} 

function Bounds () {
  return {
    x: window.two.width,
    y: window.two.height
  };
}

function Rnd(ceil) {
  return Math.floor( Math.random() * ceil );
}

function ToRads ( deg ) {
  return ( deg * Math.PI ) / 180;
} 

function Vector2 (x, y) {
  return {
    x: x,
    y: y
  };
}

// boid object
function Boid (x, y) {
  var ang = Rnd( Math.PI * 2 );

  this.poly = Tri(window.props.size);

  this.translation = Vector2( x, y );
  this.velocity = Vector2( Math.cos(ang), Math.sin(ang) );
  this.acceleration = Vector2( 0, 0 );

  this.r = 2.0;
  this.maxspeed = 2;
  this.maxforce = 0.03;

  this.move( x, y, 0 );
  console.log("Boid created at {"+x+", "+y+"}");
}

Boid.prototype.move = function(x, y, angle) {
  this.poly.translation.x = x;
  this.poly.translation.y = y;
  this.poly.rotation = ToRads( angle ) + ToRads( 180 );
};

function Tri ( size ) {
  return window.two.makePolygon(- size / 2, 0, size / 2, 0, 0, size*1.5);
}
