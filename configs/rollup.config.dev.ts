import { RollupOptions } from "rollup";
import babel from "@rollup/plugin-babel";

import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import postcss from "@yinxulai/rollup-plugin-less";

const packageInfo = require("../package.json");

const path = require("path");

const resolveFile = function (...filePath) {
  return path.join(__dirname, "..", ...filePath);
};

const configs: RollupOptions = {
  input: "src/index.ts",
  output: [
    {
      file: resolveFile("dist", packageInfo.libName + ".js"),
      format: "iife",
      name: packageInfo.libName,
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({
      cssModule: true,
      insert: true,
    }),
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
    livereload(),
    serve({
      // 装备serve武器并配置参数
      port: 3000,
      contentBase: [resolveFile("")],
    }),
    livereload(resolveFile("dist")),
  ],
};

export default configs;
