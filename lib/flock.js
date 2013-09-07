// dottru / flock javascript edition
// Maths - http://stackoverflow.com/questions/6963639/sine-and-cosine

function SimLoop ( frames ) {
  RunBoids();
}

function Gui () {
  // Global properties object
  function Properties () {
    this.size = 10;
    this.boids = 200;
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

function Bounds () {
  return {
    x: window.two.width,
    y: window.two.height
  };
}

function MakeBoids () {
  var bounds = Bounds();

  window.boids = _.map( _.range(0, window.props.boids),
    function(e) {
      return new Boid( Math.rand_int(bounds.x), Math.rand_int(bounds.y) );
    } );
} 

function RunBoids () {
  _.each( window.boids, function(b){
    b.run(window.boids);
    return b;
  });
}


