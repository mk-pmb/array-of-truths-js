/* -*- coding: UTF-8, tab-width: 2 -*- */
/* eslint-disable
  no-var,
  one-var,
  one-var-declaration-per-line,
  prefer-rest-params,
  prefer-spread,
  spaced-comment,
  strict,
  */
/*jslint indent: 2, maxlen: 80, browser: true */
(function namespace() {
  'use strict';
  var EX, emptyArray = [],
    hasOwn = Function.call.bind(Object.prototype.hasOwnProperty);

  EX = function arrayOfTruths(x) {
    /* Do not flatten potential extra arguments: They may be gratuitous
       extras from Array#forEach or String#replace. */
    if (!x) { return []; }
    return emptyArray.concat(x).filter(Boolean);
  };


  EX.ifAny = function arrayOfTruthsIfAny(x) {
    var t = (x ? EX(x) : 0);
    return (t.length ? t : 0);
  };


  EX.ifAnyMap = function arrayOfTruthsIfAnyMap(x) {
    var m;
    if (!x) { return false; }
    m = emptyArray.slice.call(arguments, 1); // ancient version of rest args
    m = emptyArray.concat.apply(emptyArray, m);
    // ^-- ancient version of spread operator + [].flatten
    return EX(m).reduce(function r(t, f) { return t && EX.ifAny(t.map(f)); },
      EX.ifAny(x));
  };


  EX.listAdd = function listAdd(o, k, v) {
    var a = emptyArray.concat(hasOwn(o, k) && o[k], v).filter(Boolean);
    o[k] = a; // eslint-disable-line no-param-reassign
    return a;
  };


  (function unifiedExport(e) {
    /*global define */
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));
}());
