/* -*- coding: UTF-8, tab-width: 2 -*- */
/* eslint-disable spaced-comment, strict, no-var, one-var */
/*jslint indent: 2, maxlen: 80, browser: true */
(function namespace() {
  'use strict';
  var EX = function arrayOfTruths(x) {
    if (!x) { return []; }
    return [].concat(x).filter(Boolean);
  };

  EX.ifAny = function arrayOfTruthsIfAny(x) {
    var t = (x ? EX(x) : 0);
    return (t.length ? t : 0);
  };


  (function unifiedExport(e) {
    /*global define */
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));
}());
