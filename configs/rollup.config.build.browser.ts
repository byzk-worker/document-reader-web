import { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
// import postcss from "@yinxulai/rollup-plugin-less";
import url from "@rollup/plugin-url";
import posthtml from "rollup-plugin-posthtml-template";

// import { postcssFontsBase64 as base64 } from "./common";

const path = require("path");
const packageInfo = require("../package.json");

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

const Global = `var process={env:{NODE_ENV: 'development'}};`;

const outDir = resolveFile("build", "dist");

export default {
  input: "src/index.ts",
  output: [
    {
      file: path.join(outDir, packageInfo.libName + ".js"),
      format: "iife",
      name: packageInfo.libName,
      sourcemap: false,
      banner: Global,
    },
    {
      file: path.join(outDir, packageInfo.libName + ".min.js"),
      format: "iife",
      name: packageInfo.libName,
      sourcemap: false,
      banner: Global,
      plugins: [
        terser({
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: () => false,
          },
        }),
      ],
    },
    {
      file: path.join(outDir, packageInfo.libName + ".ie.min.js"),
      format: "iife",
      name: packageInfo.libName,
      sourcemap: false,
      banner: Global,
      plugins: [
        terser({
          ie8: true,
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: () => false,
          },
        }),
      ],
    },
  ],
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
      // extract: resolveFile("dist", "css", "index.min.css"),
      extract: false,
      minimize: true,
      process: processLess,
      // plugins: [base64({}), autoprefixer({ add: true })],
      plugins: [autoprefixer({ add: true })],
    }),
    url({
      include: [
        "**/*.svg",
        "**/*.png",
        "**/*.jp(e)?g",
        "**/*.gif",
        "**/*.webp",
        "**/*.ttf",
        "**/*.woff",
        "**/*.woff2",
      ],
    }),
    typescript(),
    commonjs(),
    nodeResolve({ browser: true, preferBuiltins: true }),
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
