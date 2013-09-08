module Boid where

--import FFI
import Prelude

import Data.List

--import Dawm
--import Drawing
import Vektor

---------------------------------------------------------

data Boid = Boid {
  location,
  velocity,
  acceleration :: Vektor
}

---------------------------------------------------------

accum' :: [Double] -> Double
accum' xs   = accum xs (fromIntegral 0)

accum           :: [Double] -> Double -> Double
accum (x:xs) prog = accum xs (prog+x)

accum []   r    = r

---------------------------------------------------------

createBoid    :: Vektor -> Boid
createBoid loc = Boid loc zero zero

runFlock      :: Boid -> [Boid] -> Boid
runFlock b bs  = 
    let newA = acceleration b :
               mult 1.5 sep   :
               mult 1.0 ali   :
               mult 1.0 coh   : []
    in
    Boid zero zero zero
  where
    sep = separation bs
    ali = alignment bs
    coh = cohesion bs

separation x = zero
alignment  x = zero
cohesion   x = zero

---------------------------------------------------------

-- drawBoid :: Context -> Fay ()
-- drawBoid ctx = do
--   let size  = 20
--   
--   rotate ctx (1 * pi / 180)
--   
--   moveTo ctx (-size/2) 0
--   lineTo ctx  (size/2) 0
--   moveTo ctx  (size/2) 0
--   lineTo ctx   0      (size*1.5)
--   moveTo ctx   0      (size*1.5)
--   lineTo ctx (-size/2) 0
-- 
--   stroke ctx
