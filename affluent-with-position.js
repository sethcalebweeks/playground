function _(fns, obj) {
  const isFunction = (fn) => typeof fn === "function";
  return new Proxy(obj, {
    get(target, prop) {
      switch (true) {
        case isFunction(target[prop]):
          return (...args) => _(fns, target[prop].apply(target, args));
        case isFunction(fns[prop]):
          return (...args) => {
            if (args.includes(_)) {
              args = args.map((arg) => (arg === _ ? target : arg));
            } else {
              args = [target, ...args];
            }
            return _(fns, fns[prop].apply(target, args));
          };
        default:
          return target[prop];
      }
    },
  });
}

const inc = (by, arr) => arr.map((item) => item + by);
const dec = (arr, by = 1) => arr.map((item) => item - by);
const sum = (arr) => arr.reduce((a, b) => a + b);
const log = (first, ...rest) => {
  console.log(first, ...rest);
  return first;
};

const test = _({ inc, dec, sum, log }, [1, 2, 3, 4, 5])
  .log("Initial")
  .dec()
  .log("Dec by 1")
  .inc(2, _)
  .log();

// console.log(test);
