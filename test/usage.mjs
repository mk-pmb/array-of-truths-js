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


test('Basic tests in default mode', (t) => {
  basicTests(t, arrayOfTruths, []);
});

test('Basic tests for .ifAny', (t) => {
  basicTests(t, arrayOfTruths.ifAny, 0);
});


test('Sunrise tests for .ifAnyMap', (t) => {
  t.plan(3);
  const { ifAnyMap } = arrayOfTruths;
  const input = ['hello', true, 'sun', '', 'goodbye', false, 'moon', 0, 2];
  t.same(ifAnyMap(input), ['hello', true, 'sun', 'goodbye', 'moon', 2]);

  function chomp(x) { return (x.slice ? x.slice(0, -1) : x); }
  t.test('.ifAnyMap sunrise chomp', (s) => {
    s.plan(4);
    s.same(ifAnyMap(input, chomp),
      ['hell', true, 'su', 'goodby', 'moo', 2]);
    s.same(ifAnyMap(input, [chomp]),
      ['hell', true, 'su', 'goodby', 'moo', 2]);
    s.same(ifAnyMap(input, '', chomp, [], false, [NaN, chomp]),
      ['hel', true, 's', 'goodb', 'mo', 2]);
    s.same(ifAnyMap(input, [chomp, chomp, chomp]),
      ['he', true, 'good', 'm', 2]);
  });

  function plus(x) { return x + 1; }
  t.test('.ifAnyMap sunrise plus', (s) => {
    s.plan(3);
    s.same(ifAnyMap(input, [chomp, plus]),
      ['hell1', 2, 'su1', 'goodby1', 'moo1', 3]);
    s.same(ifAnyMap(input, [chomp, plus, String]),
      ['hell1', '2', 'su1', 'goodby1', 'moo1', '3']);
    s.same(ifAnyMap(input, [chomp, plus, String, chomp]),
      ['hell', 'su', 'goodby', 'moo']);
  });
});








/* scroll */
