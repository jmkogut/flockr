module Dawm where

import FFI
import Prelude

----------------------------------------------------------

data Element
data Context
data Event

type IntPair = (Int, Int)

------------------------------------------------------------

theWindow   :: Fay Element
theWindow    = ffi "window"

theDocument :: Fay Element
theDocument  = ffi "document"

------------------------------------------------------------

data Identifier = ID String
                | Class String

getElement             :: Identifier -> Fay Element
getElement (ID id)      = getElementByID id
getElement (Class id)   = getElementByClass id

getElementByID ::       String -> Fay Element
getElementByID  =       ffi "document['getElementById'](%1)"

getElementByClass ::    String -> Fay Element
getElementByClass  =    ffi "document['getElementsByClassName'](%1)[0]"

------------------------------------------------------------

getAttr     :: Element -> String -> Fay String
getAttr      = ffi "%1[%2]"

setAttr     :: Element -> String -> String -> Fay ()
setAttr      = ffi "%1[%2]=%3"

------------------------------------------------------------

maximiseElement         :: Identifier -> Fay ()

maximiseElement (ID id)  = do
  el        <-     getElementByID id
  setAttr el "width"  $ show wi
  setAttr el "height" $ show he
    where (wi, he) = getBounds

------------------------------------------------------------

getContext  :: Element -> String -> Fay Context
getContext   = ffi "%1['getContext'](%2)"

getBounds   :: IntPair
getBounds    = ffi "[window.innerWidth, window.innerHeight]"


econsole     :: Element -> Fay ()
econsole      = ffi "console['log'](%1)"

console     :: String -> Fay ()
console      = ffi "console['log'](%1)"

alert       :: String -> Fay ()
alert        = ffi "window['alert'](%1)"

-------------------------------------------------------------

-- TODO - fix
--type EventHandler = (Event -> Fay Bool)

notifyHandler    :: Event -> Fay Bool
notifyHandler   _ = do
    alert msg
    console msg
    return False
  where msg = "Event triggered." 

addEventListener :: Element -> String -> (Event -> Fay Bool) -> Fay ()
addEventListener  = ffi "%1['addEventListener'](%2,%3,false)"

addWindowEvent   :: String -> (Event -> Fay Bool) -> Fay ()
addWindowEvent    = ffi "window['addEventListener'](%1,%2,false)"

eventTarget      :: Event -> Fay Element
eventTarget       = ffi "%1['target']"

requestAnimationFrame :: (Fay ()) -> Fay ()
requestAnimationFrame  = ffi "requestAnimationFrame(%1)"

-------------------------------------------------------------

setTimeout    :: Fay () -> Double -> Fay Int
setTimeout     = ffi "window['setTimeout'](%1,%2)"

setInterval   :: Fay () -> Double -> Fay Int
setInterval    = ffi "window['setInterval'](%1,%2)"

clearInterval :: Int -> Fay ()
clearInterval  = ffi "window['clearInterval'](%1)"

-------------------------------------------------------------
