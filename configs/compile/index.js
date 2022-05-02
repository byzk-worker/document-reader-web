const fs = require("fs");
const path = require("path");

const packageInfo = require("../../package.json");

const {
  deleteFolder,
  resolveFile,
  execNodeModulesBin,
  replaceIeNotSupportText,
} = require("./utils");

const distDir = resolveFile("dist");
const docsDir = resolveFile("docs");

console.info("正在清除dist目录...");
deleteFolder(distDir);

console.info("正在清除docs目录...");
deleteFolder(docsDir);

console.info("正在编译ts文件...");
execNodeModulesBin("tsc -p " + resolveFile("configs", "tsconfig.json"));

console.info("正在打包现代浏览器可用js库...");
execNodeModulesBin(
  `rollup --config ${resolveFile(
    "configs",
    "rollup.config.build.ts"
  )} --configPlugin typescript`
);

console.info("正在打包IE浏览器可用js库...");
const srcJsContent = fs.readFileSync(
  resolveFile("dist", packageInfo.libName + ".min.js")
);
const targetJsContent = replaceIeNotSupportText(srcJsContent.toString("utf8"));
fs.writeFileSync(
  resolveFile("dist", packageInfo.libName + ".ie.min.js"),
  targetJsContent
);

console.info("正在生成typescript文档...");
execNodeModulesBin(
  `typedoc --tsconfig ${resolveFile(
    "configs",
    "tsconfig.json"
  )} --out ${resolveFile("docs")} ${resolveFile("src")}`
);
