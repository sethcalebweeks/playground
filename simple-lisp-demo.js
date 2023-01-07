const { $ } = require("./simple-lisp.js");

$("ns", "pegthing.core");

$("def", "three", ["add", 1, 2]);

$("def", "hello", ("fn", [], "Hello World"));

$("print", $(...$.three));

$("ns", "other");

$("def", "three", 4);

$("print", $("three"));

// $(
//   "defn",
//   "fib",
//   ["n"],
//   [
//     "if",
//     $("or", $("eq", $`n`, 0), $("eq", $`n`, 1)),
//     1,
//     $("add", $("fib", $("sub", $`n`, 1)), $("fib", $("sub", $`n`, 2))),
//   ]
// );

// $("defn", "hort", ["bool"], ["if", ["not", $`bool`], "heads", "tails"]);

// $("print", $("hort", true));
