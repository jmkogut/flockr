Vector2 = function( x, y ) {
  this.x = x;
  this.y = y;
};

Vector2.prototype.copy    = function( ) {
  return new Vector2(this.x, this.y);
};

Vector2.prototype.add     = function( src ) {
  return this.copy().addSelf(src);  
};

Vector2.prototype.addSelf = function( src ) {
  this.x += src.x;
  this.y += src.y;
};


Vector2.prototype.scale     = function( src ) {
  return this.copy().scaleSelf(src);
};

Vector2.prototype.scaleSelf = function( src ) {
  this.x = this.x * src.x;
  this.y = this.y * src.y;
};

Vector2.prototype.limit     = function( lim ) {
  return this.copy().limitSelf(lim);
};

Vector2.prototype.limitSelf = function( lim ) {
  if (this.x>lim.x) {
    this.x = lim.x;
  }

  if (this.y>lim.y) {
    this.y = lim.y;
  }
};

Vector2.prototype.clear     = function( ) {
  return this.copy().clearSelf();
};

Vector2.prototype.clearSelf = function( ) {
  this.x = 0;
  this.y = 0;
};

Vector2.prototype.sub     = function( src ) {
  this.copy().subSelf(src);
};

Vector2.prototype.subSelf = function( src ) {
  this.x -= src.x;
  this.y -= src.y;
};

Vector2.prototype.magnitude = function( ) {
  // todo - do mag
};

Vector2.prototype.norm     = function( ) {
  return this.copy().normSelf();
};

Vector2.prototype.normSelf = function( ) {
  // todo - do norm
};
