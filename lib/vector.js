// 2D vector
Vector2 = function( x, y ) {
  this.x = x;
  this.y = y;
};

// copy vector into new ob
Vector2.prototype.copy    = function( ) {
  return new Vector2(this.x, this.y);
};

// add to a copy
Vector2.prototype.add     = function( src ) {
  return this.copy().addSelf(src);  
};

// add to self
Vector2.prototype.addSelf = function( src ) {
  this.x += src.x;
  this.y += src.y;
  return this;
};

// scale a copy
Vector2.prototype.scale     = function( src ) {
  return this.copy().scaleSelf(src);
};

// scale self
Vector2.prototype.scaleSelf = function( src ) {
  this.x *= src.x;
  this.y *= src.y;
  return this;
};

// limit a copy
Vector2.prototype.limit     = function( lim ) {
  return this.copy().limitSelf(lim);
};

// limit self
Vector2.prototype.limitSelf = function( lim ) {
  if (this.magnitude() > lim) {
    this.normSelf();
    this.scale(lim);
  }
  return this;
};

// clear a copy
Vector2.prototype.clear     = function( ) {
  return this.copy().clearSelf();
};

// clear self
Vector2.prototype.clearSelf = function( ) {
  this.x = 0;
  this.y = 0;
  return this;
};

// sub from a copy
Vector2.prototype.sub     = function( src ) {
  this.copy().subSelf(src);
};

// sub from self
Vector2.prototype.subSelf = function( src ) {
  this.x -= src.x;
  this.y -= src.y;
  return this;
};

// return normalised vector
Vector2.prototype.norm     = function( ) {
  return this.copy().normSelf();
};

// normalise self
Vector2.prototype.normSelf = function( ) {
  var l = this.magnitude();

  this.x /= l;
  this.y /= l;
  return this;
};

// return vector magnitude
Vector2.prototype.magnitude = function( ) {
  return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
};

// Used in node for testing the math
// module.exports = Vector2;
