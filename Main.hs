module Main where

-- import FFI
import Prelude hiding (pi)

import Dawm
import Maths
import Vektor
import Drawing
import Boid

-------------

--startFlock   :: Event ->
loopFlock = do
    --console "Loop triggered" 
    canv <- getElement ident
    ctx  <- getContext canv "2d"
    
    reset ctx
    drawBoid ctx
    
    requestAnimationFrame loopFlock
  where
    ident = (ID "canvas")

----------------------------------------------------------

startLoop _ = do
    console "OnLoad fired"
    maximiseElement ident
    console $ "Canvas maximised to " ++ (fmt getBounds)

    canv <- getElement ident
    ctx  <- getContext canv "2d"
    translate ctx 50 50
    save ctx 
    
    requestAnimationFrame loopFlock
    return False
  where 
    ident = (ID "canvas")
    fmt (h,t) = show h ++ ", " ++ show t


main :: Fay ()
main  = do
  addWindowEvent "load" startLoop
