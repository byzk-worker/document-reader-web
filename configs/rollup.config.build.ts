import { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import postcss from "@yinxulai/rollup-plugin-less";

const path = require("path");
const packageInfo = require("../package.json");

const resolveFile = function (...filePath) {
  return path.join(__dirname, "..", ...filePath);
};

export default {
  input: "src/index.ts",
  output: [
    {
      file: resolveFile("dist", packageInfo.libName + ".min.js"),
      format: "iife",
      name: packageInfo.libName,
      sourcemap: false,
    },
  ],
  plugins: [
    postcss({
      cssModule: true,
      insert: true,
      //   extensions: [".css"],
    }),
    // del({ targets: "dist/*" }),
    typescript(),
    commonjs(),
    nodeResolve(),
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
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        ie8: true,
      },
      output: {
        comments: () => false,
      },
    }),
  ],
} as RollupOptions;
