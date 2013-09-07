#!/usr/bin/env node

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
