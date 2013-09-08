module Maths where

import FFI
import Prelude

random  :: Fay (Double)
random   = ffi "Math.random()"

floor   :: Double -> Fay (Double)
floor    = ffi "Math.floor(%1)"

pi      :: Fay (Double)
pi       = ffi "Math.PI"

-- randFloat     :: Double -> Fay(Double)
-- randFloat max  = do
--   r <- random,
