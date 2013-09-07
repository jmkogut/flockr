console.log("Expect any float between 0-100");
console.log( Math.rand_float( 100 ) );

console.log("Expect any int between 0-100");
console.log( Math.rand_int( 100 ) );

console.log("Expect the two numbers to equal each other.");
console.log( Math.radians( 180 ) === Math.PI );

console.log("Expect equality here too.");
console.log( Math.degrees( Math.PI ) === 180 );

console.log("Expect an x,y dict of 50,50");
console.log( Math.Vector2(50,50) );
