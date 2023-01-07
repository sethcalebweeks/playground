const zipWith = (a, b, f) =>
  Array(Math.min(a.length, b.length))
    .fill()
    .map((_, i) => f(a[i], b[i]));

const concat = (a, b) => a + b;

const arr = [1, 2, 3, 4];
const even = (num) => num % 2 === 0;

const invert = (obj) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({ ...acc, ...{ [value.toString()]: key } }),
    {}
  );
};

const prop = (obj, prop) => obj[prop];

const helpers = { zipWith, prop, concat };

const chain2 = (fns, obj) => {
  const newObj = new Object(obj);
  if (typeof obj === "object" && obj !== null) {
    return new Proxy(newObj, {
      get(target, prop) {
        if (typeof target[prop] === "function") {
          return (...args) => chain(fns, target[prop].apply(target, args));
        } else if (
          typeof target[prop] === "undefined" &&
          typeof fns[prop] === "function"
        ) {
          return (...args) =>
            chain(fns, fns[prop].apply(target, [target, ...args]));
        }
        return target[prop];
      },
    });
  }
  return obj;
};

const add = (one, two) => one + two;
const inc = (arr, by = 1) => {
  console.log("inc ran");
  return arr.map((item) => item + by);
};
const sum = (arr) => {
  console.log("sum ran");
  return arr.reduce(add);
};

function chain(fns) {
  const isFunction = (fn) => typeof fn === "function";
  // const apply = (target, inner, fn, args) => (data) => {
  //   const inside = inner(data);
  //   switch (true) {
  //     case isFunction(inside[fn]):
  //       return inside[fn].apply(inside, args);
  //     case isFunction(fns[fn]):
  //       return fns[fn].apply(target, [inside, ...args]);
  //     default:
  //       return inside[fn];
  //   }
  // };
  const chainify = (inner) =>
    new Proxy(inner, {
      get: (target, fn) => {

        switch (true) {
          case isFunction(inside[fn]):
            return inside[fn].apply(inside, args);
          case isFunction(fns[fn]):
            return fns[fn].apply(target, [inside, ...args]);
          default:
            return inside[fn];
        }

        return (...args) =>
          chainify((data) => {
            const inside = inner(data);
            switch (true) {
              case isFunction(inside[fn]):
                return inside[fn].apply(inside, args);
              case isFunction(fns[fn]):
                return fns[fn].apply(target, [inside, ...args]);
              default:
                return inside[fn];
            }
          });
      },
    });
  return chainify((data) => data);
}

const guy = chain({ inc, sum });
const _sum = guy
  .inc(2)
  .map((num) => num * 10)[0]();

console.log(_sum(arr));

// const caller = (obj) =>
//   new Proxy(() => {}, {
//     apply(_target, _, [prop, def, ...args]) {
//       return obj[prop] || obj._ || def;
//     },
//   });

// const call = caller({
//   1: "test",
//   2: "hiya",
//   _: "default",
// });

// console.log(call(1));

// (fns, obj) => {
//   const newObj = new Object(obj);
//   if (typeof obj === "object" && obj !== null) {
//     return new Proxy(newObj, {
//       get(target, prop) {
//         if (typeof target[prop] === "function") {
//           return (...args) => chain(fns, target[prop].apply(target, args));
//         } else if (
//           typeof target[prop] === "undefined" &&
//           typeof fns[prop] === "function"
//         ) {
//           return (...args) =>
//             chain(fns, fns[prop].apply(target, [target, ...args]));
//         }
//         return target[prop];
//       },
//     });
//   }
//   return obj;
// };

// const arr2 = chain(arr, { zipWith })
//   .filter((item) => item > 2)
//   .filter(even)
//   .map((item) => item / 2)
//   .zipWith(["a", "b", "c"], concat);

// console.log(arr2);

// const result = chain(arr, helpers)
//   .filter(even)
//   .zipWith([10, 10, 10], concat)
//   .prop(0);

// // console.log(result);

// const red = (arr, fn) =>
//   arr.reduce((acc, item) => ({ ...acc, ...fn(item) }), {});

// const objHelpers = { red, invert };

// const res = chain(arr, objHelpers)
//   .red((item) => ({ [item]: `item${item}` }))
//   .invert();

// console.log(res);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const arr2 = ["a", "b", "c", "d"];

// const ex = chain({ zipWith }, arr).filter(even).zipWith(arr2, concat);

// console.log(ex);
