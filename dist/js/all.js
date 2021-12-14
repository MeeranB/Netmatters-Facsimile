"use strict";

var name = "meeran";

var add = function add(a, b) {
  return a + b;
};

var sum = function sum() {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }

  return numbers.reduce(function (prev, curr) {
    return prev + curr;
  });
};

console.log(sum);
//# sourceMappingURL=all.js.map
