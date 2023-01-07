const named = (name, fn) =>
  ({
    [name](...args) {
      return fn(...args);
    },
  }[name]);

const addCoreFunctions = (fnObj) =>
  Object.assign(
    $,
    Object.fromEntries(Object.entries(fnObj).map(([k, v]) => [k, named(k, v)]))
  );

const isFunction = (fn) => typeof fn === "function";
const isArray = (arr) => Array.isArray(arr);
const isUndefined = (un) => un === undefined;
const ifDefined = (val, def) => (isUndefined(val) ? def : val);

function $(fn, ...args) {
  const noArgs = args.length === 0;
  const eval = (() => {
    switch (true) {
      case isArray(fn):
        return "$" + fn;
      case isFunction($[fn]):
        return noArgs ? $[fn] : $[fn](...args);
      case isFunction($._namespaces[$._namespaces._current][fn]):
        return noArgs
          ? $._namespaces[$._namespaces._current][fn]
          : $._namespaces[$._namespaces._current][fn](...args);
      default:
        return $._namespaces[$._namespaces._current][fn] || fn;
    }
  })();
  // console.log(fn, args, "->", eval);
  return eval;
}

$ = Object.assign($, {
  _namespaces: {
    _current: "default",
    default: {},
  },
  ns(namespace) {
    $._namespaces._current = namespace;
    $._namespaces[namespace] = {};
  },
  def(name, value) {
    $._namespaces[$._namespaces._current][name] = value;
  },
  fn(argNames, body, name = "(anonymous)") {
    const nameWithNamespace = `${name} (${$._namespaces._current})`;
    return named(nameWithNamespace, (...args) => {
      const params = argNames.reduce(
        (params, param, i) => ({
          ["$" + param]: args[i],
          ...params,
        }),
        {}
      );
      return $(...body.map((val) => ifDefined(params[val], val)));
    });
  },
  defn(fname, argNames, body) {
    $("def", fname, $("fn", argNames, body, fname));
  },
  eval(args) {
    return $(...args);
  },
});

// Core functions
addCoreFunctions({
  // Control flow
  if: (cond, t, f) => (cond ? t : f),

  // Environment
  print: (...args) => console.log(...args),

  // Math
  add: (...args) => args.reduce((a, b) => a + b),
  sub: (a, b) => a - b,
  mult: (...args) => args.reduce((a, b) => a * b),
  div: (a, b) => a / b,
  inc: (a) => a + 1,

  // Booleans
  eq: (a, b) => a === b,
  not: (a) => !a,
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  gte: (a, b) => a >= b,
  lte: (a, b) => a <= b,

  // Strings
  str: this.add,

  // Lists
  cons: (item, list) => [item, ...list],
  conj: (list, item) => [...list, item],
  concat: (a, b) => [...a, ...b],
  map: (fn, list) => list.map(fn),
  filter: (fn, list) => list.filter(fn),
});

module.exports = {
  $,
};

// console.log($);

/*
Maybe = Some(thing) | Nothing

obj = {
  "hello": "world",
  [h | t]: [t | h],
  True: False,
  Some(thing): {
    two = 1 + 1
    thing + two
  },
  other: 
}

func
  "hello": "world"
  [h | t]: [t | h]
  True: False
  Some(thing):
    two = 1 + 1
    thing + two
  other: Nothing

func(Nothing)


*/
