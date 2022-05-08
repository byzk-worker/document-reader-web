import { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import posthtml from "rollup-plugin-posthtml-template";
const path = require("path");

// const base64 = require("postcss-font-base64");
const autoprefixer = require("autoprefixer");
const postcss = require("rollup-plugin-postcss");
const less = require("less");

const resolveFile = function (...filePath) {
  return path.join(__dirname, "..", ...filePath);
};

const processLess = function (context, payload) {
  return new Promise((resolve, reject) => {
    less.render(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );

    less.render(context, {}).then(
      function (output) {
        // output.css = string of css
        // output.map = string of sourcemap
        // output.imports = array of string filenames of the imports referenced
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};

const outDir = resolveFile("build");

export default {
  input: "src/index.ts",
  output: [
    {
      file: path.join(outDir, "index.js"),
      format: "es",
      sourcemap: false,
    },
  ],
  external: ["classnames", "san"],
  plugins: [
    // postcss({
    //   cssModule: true,
    //   insert: true,
    //   //   extensions: [".css"],
    // }),
    // del({ targets: "dist/*" }),
    // posthtml({
    //   template: true,
    // }),
    posthtml({
      directives: [{ name: "%", start: "<", end: ">" }],
    }),
    postcss({
      // modules: true,
      extract: path.join(outDir, "index.css"),
      minimize: false,
      process: processLess,
      // plugins: [base64({}), autoprefixer({ add: true })],
      plugins: [autoprefixer({ add: true })],
    }),
    typescript(),
    commonjs(),
    // nodeResolve(),
    babel({
      exclude: "node_modules/**", // 防止打包node_modules下的文件
      babelHelpers: "runtime", // 使plugin-transform-runtime生效
      // 使用预设
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            useBuiltIns: "usage",
            corejs: "3.22.1",
            // 目标浏览器
            // "targets": {
            //   "edge": '17',
            //   "firefox": '60',
            //   "chrome": '67',
            //   "safari": '11.1',
            //   'ie': '6',
            // },
          },
        ],
        // ['env', {
        //   modules: false,
        //   useBuiltIns: false,
        //   targets: {
        //     browsers: [
        //       '> 1%',
        //       'last 2 versions',
        //       'Firefox ESR',
        //     ],
        //   },
        // }]
      ],
      plugins: [
        //  多次导入的文件，只导入一次
        ["@babel/plugin-transform-runtime"],
      ],
    }),
  ],
} as RollupOptions;
