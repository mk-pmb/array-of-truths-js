
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


### arrayOfTruths.ifAny(x)

Like `arrayOfTruths(x)` but if there are no truthy items,
instead of an empty array, return number 0.



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
