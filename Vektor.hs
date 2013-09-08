module Vektor (
  Vektor,
  zero,
  mult,
  clear,
  add,
  scale,
  sub,
  mag,
  norm,
  heading,
  distance,
  limit,

  asRadians,
  asDegrees  
) where

-------------------------------------------------------
------------------------------------------------------

import Prelude
import Data.List

data Vektor = Vektor {
  pX, pY :: Double
} deriving Show

--------------------------------------------------------
-- operFactory to generate the methods since they're all
-- the fucking same anyway

lsplit                 = \v -> [pX v, pY v]

dsplit v1 v2           = lsplit v1 ++ lsplit v2

factory oper v1        = Vektor a b
  where [a,b]          = map (oper) (lsplit v1)
 
operFactory oper v1 v2 = Vektor ((oper) a c) ((oper) b d)
  where [a,b,c,d]      = dsplit v1 v2
 
------------------------------------------------

zero   = Vektor      0 0
mult f = factory     (* f)
clear  = mult 0

add    = operFactory (+)
scale  = operFactory (*)
sub    = operFactory (-)

distance v1 v2 = mag (sub v1 v2)

------------------------------------------------

mag v          = sqrt (a+b)
  where [a,b]  = (lsplit . factory (^2)) v

norm v         = factory (\x -> x / m) $ v
  where m      = mag v

heading v      = atan2 (0-a) b
  where [a,b]  = (lsplit . norm) v

limit v1 lim   = if m > lim then ((mult lim) . norm) v1 else v1
  where m      = mag v1

------------------------------------------------
-- Angle calcs

asRadians = (/)180 . (*)pi
asDegrees = (*) (180 / pi)

------------------------------------------------
