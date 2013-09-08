module Drawing where

import FFI
import Prelude
import Dawm

-----------------------



save          :: Context -> Fay ()
save           = ffi "%1.save()"

restore       :: Context -> Fay ()
restore        = ffi "%1.restore()"

translate     :: Context -> Double -> Double -> Fay ()
translate      = ffi "%1.translate(%2,%3)"

scale         :: Context -> Double -> Double -> Fay ()
scale          = ffi "%1.scale(%2,%3)"

rotate        :: Context -> Double -> Fay ()
rotate         = ffi "%1.rotate(%2)"

lineJoin      :: Context -> String -> Fay ()
lineJoin       = ffi "%1.lineJoin=%2"

lineCap       :: Context -> String -> Fay ()
lineCap        = ffi "%1.lineCap=%2"

lineWidth     :: Context -> String -> Fay ()
lineWidth      = ffi "%1.lineWidth=%2"

strokeStyle   :: Context -> String -> Fay ()
strokeStyle    = ffi "%1.strokeStyle=%2"

fillStyle     :: Context -> String -> Fay ()
fillStyle      = ffi "%1.fillStyle=%2"

clearRect     :: Context -> Int -> Int -> Int -> Int -> Fay ()
clearRect      = ffi "%1.clearRect(%2,%3,%4,%5)"

rect          :: Context -> Int -> Int -> Int -> Int -> Fay ()
rect           = ffi "%1.rect(%2,%3,%4,%5)"

fillRect      :: Context -> Int -> Int -> Int -> Int -> Fay ()
fillRect       = ffi "%1.fillRect(%2,%3,%4,%5)"

strokeRect    :: Context -> Int -> Int -> Int -> Int -> Fay ()
strokeRect     = ffi "%1.strokeRect(%2,%3,%4,%5)"

arc           :: Context ->
                 Int -> Int ->
                 Int -> Int ->
                 Double -> Bool ->
                 Fay ()
arc            = ffi "%1.arc(%2,%3,%4,%5,%6,%7)"

lineTo        :: Context -> Double -> Double -> Fay ()
lineTo         = ffi "%1.lineTo(%2,%3)"

moveTo        :: Context -> Double -> Double -> Fay ()
moveTo         = ffi "%1.moveTo(%2,%3)"

fill          :: Context -> Fay ()
fill           = ffi "%1.fill()"

stroke        :: Context -> Fay ()
stroke         = ffi "%1.stroke()"
