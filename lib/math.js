Math.rand_float = function ( ceil ) {
  return Math.random() * ceil;
};

Math.rand_int = function ( ceil ){
  return Math.floor( Math.random() * ceil );
};

Math.radians = function ( deg ) {
  return ( deg * Math.PI ) / 180;
};

Math.degrees = function ( rads ) {
  return rads * ( 180 / Math.PI );
};

