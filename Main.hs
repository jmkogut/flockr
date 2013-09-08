module Main where

-- import FFI
import Prelude hiding (pi)

import Dawm
import Maths
import Vektor
import Drawing

-- format pair
fmtPair         :: (Int, Int) -> String
fmtPair (x,y)    = "{"++ show x ++", "++ show y ++"}"

-------------

drawBoid :: Context -> Fay ()
drawBoid ctx = do
  let (x,y) = (50,50)
  let size  = 20
  
  translate ctx x y

  pi' <- pi 
  rotate ctx (90 * pi' / 180)
  --moveTo ctx x y    -- centre
  moveTo ctx (-size/2) 0
  lineTo ctx  (size/2) 0
  moveTo ctx  (size/2) 0
  lineTo ctx   0      (size*1.5)
  moveTo ctx   0      (size*1.5)
  lineTo ctx (-size/2) 0

  stroke ctx

main :: Fay ()
main = do
  c <- initialise "canvas"
  ctx <- getContext c "2d"
  b <- getBounds
  log' $ "Canvas maximised to " ++ (fmtPair b)

  drawBoid ctx
