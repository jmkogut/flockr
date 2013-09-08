module Dawm where

import FFI
import Prelude

-- Maximises canvas element
data Element
initialise  :: String -> Fay Element
initialise   = ffi "initialiseCanvas(%1)"

-- Retrieves drawing ctx
data Context
getContext  :: Element -> String -> Fay Context
getContext   = ffi "%1['getContext'](%2)"

-- Read bounds
getBounds   :: Fay (Int, Int)
--getBounds    = ffi "getBounds()"
getBounds    = ffi "[window.innerWidth, window.innerHeight]"

-- console.log
log'        :: String -> Fay ()
log'         = ffi "console['log'](%1)"

-- alert
alert       :: String -> Fay ()
alert        = ffi "window['alert'](%1)"
