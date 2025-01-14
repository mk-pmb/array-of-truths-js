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


test('Flower clock tests for .listAdd', (t) => {
  t.plan(1);
  const clk = {
    naming: 'latin',
    morning: 'Mirabilis jalapa',
    midday: ['Zinnia grandiflora', 'Zinnia elegans'],
    evening: null,
    autogrow: false,
    colors: 'keep',
  };
  const add = arrayOfTruths.listAdd;
  add(clk, 'midday', 'Zinnia peruviana');
  add(clk, 'evening', 'Oenothera speciosa');
  add(clk, 'night', 'Ipomoea alba');
  add(clk, 'evening', 'Jasminum officinale');
  add(clk, 'night', '');
  add(clk, 'morning', 'Ipomoea nil');
  add(clk, 'morning', null);
  add(clk, 'evening', 'Jasminum sambac');
  add(clk, 'midday', 'Jasminum polyanthum');
  add(clk, 'evening', 0);
  add(clk, 'evening', 'Jasminum sambac');
  add(clk, 'night', 'Cestrum nocturnum');
  add(clk, 'midday');
  add(clk, 'alreadyPlanted');
  add(clk, 'colors', false);
  add(clk, 'hasOwnProperty', 123);
  t.same(clk, {
    naming: 'latin',
    morning: ['Mirabilis jalapa', 'Ipomoea nil'],
    midday: [
      'Zinnia grandiflora',
      'Zinnia elegans',
      'Zinnia peruviana',
      'Jasminum polyanthum',
    ],
    evening: [
      'Oenothera speciosa',
      'Jasminum officinale',
      'Jasminum sambac',
      'Jasminum sambac',
    ],
    night: ['Ipomoea alba', 'Cestrum nocturnum'],
    autogrow: false,
    alreadyPlanted: [],
    colors: ['keep'],
    hasOwnProperty: [123],
  });
  t.end();
});















/* scroll */
