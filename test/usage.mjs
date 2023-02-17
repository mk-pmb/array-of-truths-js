// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import arrayOfTruths from '../index.js';


function basicTests(t, func, empty) {
  t.plan(14);
  t.same(func(), empty);
  t.same(func(undefined), empty);
  t.same(func(false), empty);
  t.same(func(null), empty);
  t.same(func(0), empty);
  t.same(func(''), empty);
  t.same(func([]), empty);
  t.same(func([[]]), [[]]);
  t.same(func([[], []]), [[], []]);
  t.same(func({}), [{}]);
  t.same(func([{}, {}]), [{}, {}]);
  t.same(func([{ a: 1 }, { b: 2 }]), [{ a: 1 }, { b: 2 }]);
  t.same(func([undefined, 0, false, null, '']), empty);
  t.same(func([{ a: 1 }, { b: 2 }, null, 3, '', 'hi', true, [true]]),
    [{ a: 1 }, { b: 2 }, 3, 'hi', true, [true]]);
  t.end();
}


test('Basic tests in default mode', async (t) => {
  basicTests(t, arrayOfTruths, []);
});

test('Basic tests for .ifAny', async (t) => {
  basicTests(t, arrayOfTruths.ifAny, 0);
});








/* scroll */
