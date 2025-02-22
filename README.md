﻿
<!--#echo json="package.json" key="name" underline="=" -->
array-of-truths
===============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Ensure your input becomes an Array, and keep only the truthy values.
<!--/#echo -->



API
---

This module exports one function that holds another function:

### arrayOfTruths(x)

If x is not an array, it will be treated as an array with x as the only item.
Return a new Array that contains the truthy items from x.


### .ifAny(x)

Like `arrayOfTruths(x)` but if there are no truthy items,
instead of an empty array, return number 0.



### .ifAnyMap(x, m)

Map a list `x` through one or more mapper functions `m`
(function or array of functions), except initially and also
after each step, false-y items are removed from the list.
If the list would be empty, return number 0 instead.



### .listAdd(o, k, v)

Replace `o[k]` with an array that contains:

1. The truthy old value(s), if `o` had an "own" property named `k`.
   See usage test for caveats.
2. `v` if it is truthy.

Returns that new array.





Usage
-----

see [test/usage.mjs](test/usage.mjs).


<!--#toc stop="scan" -->



Known issues
------------

* I find the package name tricky to pronounce.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
