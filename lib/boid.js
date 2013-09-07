// Adapted from
// https://github.com/hapticdata/toxiclibsjs/blob/master/examples/flocking/Boid.pde

function Boid (x, y) {
  console.log("New boid");
  console.log(x+", "+y);

  var ang = Math.rand_float( Math.PI * 2 ),
      size = window.props.size;

  this.size = size;

  this.poly = window.two.makePolygon(- size / 2, 0, size / 2, 0, 0, size*1.5);

  this.location       =  new Vector2( x, y );
  this.velocity       =  new Vector2( Math.cos(ang), Math.sin(ang) );
  this.acceleration   =  Vector2.zero();

  this.r = 2.0;
  this.maxspeed = 2;
  this.maxforce = 0.03;

  this.poly.translation.x = x;
  this.poly.translation.y = y;
  this.poly.rotation = Math.radians( ang ) + Math.radians( 180 );
}

Boid.bounds = function () {
  return new Vector2( window.two.width, window.two.height );
};

Boid.prototype.run   = function( others ) {
  this.flock(others);
  this.update();
  this.bounce();
};

Boid.prototype.flock = function( others ) {
  var sep = this.separate( others ), 
      ali = this.align   ( others ),
      coh = this.cohese  ( others );

  sep.scaleSelf(1.5);
  ali.scaleSelf(1.0);
  coh.scaleSelf(1.0);

  //throw new Error("Haha.");

  this.acceleration.addSelf(sep);
  this.acceleration.addSelf(ali);
  this.acceleration.addSelf(coh);
};

Boid.prototype.update = function() {
  this.velocity.addSelf(   this.acceleration);
  this.velocity.limitSelf( this.maxspeed);
  this.location.addSelf(   this.velocity);

  this.acceleration.clearSelf();

  // update poly
  var theta = this.velocity.heading() + Math.radians( 0 );
  this.poly.rotation      = theta;
  this.poly.translation.x = this.location.x;
  this.poly.translation.y = this.location.y;
};

Boid.prototype.bounce = function() {
  var b = Boid.bounds();
  if (this.location.x < -this.size) { this.location.x = b.x + this.size; }
  if (this.location.y < -this.size) { this.location.y = b.y + this.size; }
  if (this.location.x > b.x + this.size) { this.location.x = -this.size; }
  if (this.location.y > b.y + this.size) { this.location.y = -this.size; }
};

Boid.prototype.separate = function( others ){
  var sepFac = 25.0,
      steer = Vector2.zero(),
      count = 0,
      self = this;

  _.each(others, function(b) {
    var d = b.location.distanceTo( self.location );
    if ((d>0) && (d<sepFac)) {
      var diff = self.location.sub(b.location);
      diff.normSelf(1.0/d);
      steer.addSelf(diff);
      count++;
    }
  });

  if (count>0) {
    steer.scaleSelf(1.0/count);
  }

  if (steer.magnitude() > 0) {
    steer.normSelf(this.maxspeed);
    steer.subSelf(this.velocity);
    steer.limitSelf(this.maxforce);
  }

  return steer;
};

Boid.prototype.align = function( others ){
  var sepFac = 50.0,
      steer = Vector2.zero(),
      count = 0,
      self = this;

  _.each(others, function(b) {
    var d = b.location.distanceTo( self.location );
    if ((d>0) && (d<sepFac)) {
      steer.addSelf(b.velocity);
      count++;
    }
  });

  if (count>0) {
    steer.scaleSelf(1.0/count);
  }

  if (steer.magnitude() > 0) {
    steer.normSelf(this.maxspeed);
    steer.subSelf(this.velocity);
    steer.limitSelf(this.maxforce);
  }

  return steer;
};

Boid.prototype.cohese = function( others ){
  var sepFac = 50.0,
      steer = Vector2.zero(),
      count = 0,
      self = this;

  _.each(others, function(b) {
    var d = b.location.distanceTo( self.location );
    if ((d>0) && (d<sepFac)) {
      steer.addSelf(b.location);
      count++;
    }
  });

  if (count>0) {
    steer.scaleSelf(1.0/count);
    return this.steer(steer, false);
  }

  return steer;
};

Boid.prototype.seek = function( target ) {
  this.acceleration.addSelf(this.steer(target, false));
};

Boid.prototype.arrive = function( target ) {
  this.acceleration.addSelf(this.steer(target, true));
};

Boid.prototype.steer = function( target, slow ) {
  var steer   = Vector2.zero(),
      desired = target.sub(this.location),
      d       = desired.magnitude();

  if (d > 0) {
    desired.normSelf();
    
    if (slow && d < 100) {
      desired.scaleSelf(this.maxspeed*d/100);
    } else {
      desired.scaleSelf(this.maxspeed);
    }

    steer = desired.sub(this.velocity).limitSelf(this.maxforce);
  }
  // steer defaults to vector.zero
  // else {
  //   steer = new Vector2(0, 0);
  // }

  return steer;
};
