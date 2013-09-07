#!/usr/bin/env node

Math.degrees = function ( rads ) {
  return rads * ( 180 / Math.PI );
};

var Vector2 = require('./vector'),
    Expect  = require('./test');

var One = new Vector2(1,1),
    Two = new Vector2(2,2);

var one = new Vector2(3, 4);
Expect(one, "Vector 3,4");

var two = one.copy();
Expect(two, "Vector 3,4");

Expect(one.add(One), "Vector 4,5");

Expect(two.add(Two), "Vector 5,6");

one.addSelf(Two);
Expect(one, "Vector 5,6");

two.addSelf(One);
Expect(two, "Vector 4,5");

two.scaleSelf(Two);
Expect(two, "Vector 8,10");

two.subSelf(One);
Expect(two, "Vector 7,9");

var t = new Vector2(3, 4);
Expect(t.limit(1), "Vector .6, .8");

Expect(one.add(two), "Vector 12,15");

Expect(one.clear(), "Vector 0,0");

console.log("Distance between 0,0 and 10,0");
Expect(Vector2.zero().distanceTo(new Vector2(10,0)), "scal 10");

console.log("Distance between 0,0 and 10,10");
Expect(Vector2.zero().distanceTo(new Vector2(10,10)), "scal > 10");

console.log("Heading test. -1,-1, 1,-1, 1,1, -1,1");
var nw = new Vector2(-1,-1),
    ne = new Vector2(1, -1),
    se = new Vector2(1,  1),
    sw = new Vector2(-1, 1);

Expect(Math.degrees(nw.heading()), "nw");
Expect(Math.degrees(ne.heading()), "ne");
Expect(Math.degrees(se.heading()), "se");
Expect(Math.degrees(sw.heading()), "sw");
