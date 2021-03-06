import pkg from "./package.json";
import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";

// import json from "rollup-plugin-json";

export default [
  // browser-friendly UMD build
  {
    input: "src/main.js",
    output: {
      banner:
        "// @author Navicstein Rotciv <https://twitter.com/navicsteinR> \n",
      name: "cloud",
      file: pkg.browser,
      format: "umd",
      preferConst: true,
    },
    plugins: [
      minify({
        comments: false,
        // Options for babel-minify.
      }),
      babel({
        exclude: "node_modules/**",
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  // {
  //   input: "src/main.js",
  //   external: [],
  //   output: [
  //     // { file: pkg.main, format: "cjs" },
  //     // { file: pkg.module, format: "es" },
  //   ],
  // },
];
