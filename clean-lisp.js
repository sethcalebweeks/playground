const $ = (fn, ...args) => fn(...args);

const def = (name, value) => {
  global[name] = value;
};

const fn = (params, body) => new Function(params, `return ${body}`);

const defn = (name, params, body) => $(def, name, $(fn, params, body));

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

$(defn, "split", ["string", "delimiter"], "string.split(delimiter)");
$(defn, "map", ["arr", "fn"], "arr.map(fn)");
$(defn, "reduce", ["arr", "fn", "initial"], "arr.reduce(fn, initial)");
$(defn, "stringToInt", ["string"], "parseInt(string, 10)");

$(def, "elves", $(split, input, "\n\n"));
$(def, "calories", $(map, elves, $(fn, ["elf"], 'elf.split("\n")')));

// input(1)
// ~> String.split("\n\n")
// ~> Enum.map(fn elf ->
//   elf
//   ~> String.split("\n")
//   ~> Enum.reduce(0, fn a, b -> String.to_integer(a) + b end)
// end)
// ~> Enum.max()

console.log(calories);
