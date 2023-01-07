// Function application and variable tagging
function $(fn, ...args) {
  return typeof fn === "function" ? fn(...args) : "$" + fn;
}

// Basic
$ = Object.assign($, {
  // Assignment
  def(name, value) {
    $[name] = value;
  },
  // Anonymous functions
  fn(argNames, body) {
    return (...args) => {
      const bodyArray = args.reduce((body, arg, i) => {
        const index = body.indexOf("$" + argNames[i]);
        body[index] = arg;
        return body;
      }, body);
      return bodyArray.length === 1 ? bodyArray[0] : $(...bodyArray);
    };
  },
  // Named functions
  defn(fname, argNames, body) {
    $.def(fname, $.fn(argNames, body));
  },
  eval(args) {
    return $(...args);
  },
});

// Environment
$ = Object.assign($, {
  print(...args) {
    console.log(...args);
  },
});

// Core functions
$ = Object.assign($, {
  // Math

  add(...args) {
    return args.reduce((a, b) => a + b);
  },
  sub(a, b) {
    return a - b;
  },
  mul(...args) {
    return args.reduce((a, b) => a * b);
  },
  div(a, b) {
    return a / b;
  },
  inc(a) {
    return a + 1;
  },
  even(a) {
    return a % 2 === 0;
  },
  // Booleans
  eq(a, b) {
    return a === b;
  },
  not(a) {
    return !a;
  },
  // Strings
  str(...args) {
    return $.add(...args);
  },
  // Lists
  cons(item, list) {
    return [item, ...list];
  },
  conj(list, item) {
    return [...list, item];
  },
  concat(a, b) {
    return [...a, ...b];
  },
  map(fn, list) {
    return list.map(fn);
  },
  filter(fn, list) {
    return list.filter(fn);
  },
});

module.exports = {
  $,
};
