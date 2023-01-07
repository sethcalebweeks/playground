const compose = (fns) => {
  const _compose = (inner) =>
    new Proxy(inner, {
      get(target, fn) {
        return (...args) =>
          _compose((data) => {
            const inside = inner(data);
            // console.log(inside);
            return fns[fn].apply(target, [inside, ...args]);
          });
      },
    });
  return _compose((data) => data);
};

const shuffle = (arr) => {
  const remaining = [...arr];
  const shuffled = [];
  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor(Math.random() * remaining.length);
    shuffled.push(remaining[index]);
    remaining.splice(index, 1);
  }
  return shuffled;
};

const log = (item, ...rest) => {
  console.log(item, ...rest);
  return item;
};

const map = (fn) => (arr) => arr.map(fn);

const compost = compose({ shuffle, log });

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const func = compost.shuffle().log();

func(array);
