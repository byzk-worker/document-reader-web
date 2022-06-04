const fs = require("fs");
const path = require("path");

const packageInfo = require("../../package.json");

delete packageInfo.devDependencies;
delete packageInfo.scripts;

const {
  deleteFolder,
  resolveFile,
  execNodeModulesBin,
  replaceIeNotSupportText,
  copyFile,
  copyHasSuffixFileToDest,
  handlePackageJsonFile,
} = require("./utils");

const distDir = resolveFile("build");
const docsDir = resolveFile("build", "docs");

console.info("正在清除编译目录...");
deleteFolder(distDir);

// console.info("正在清除docs目录...");
// deleteFolder(docsDir);

console.info("正在编译ts文件...");
// execNodeModulesBin("tsc -p " + resolveFile("configs", "tsconfig.json"));
// copyHasSuffixFileToDest(
//   resolveFile("src"),
//   path.join(distDir, "dist", "lib"),
//   ".less"
// );
// copyFile(
//   resolveFile("configs", "compile", "types.d.ts"),
//   resolveFile("build", "types.d.ts")
// );
// copyFile(
//   resolveFile("configs", "compile", "index.d.ts"),
//   resolveFile("build", "index.d.ts")
// );
copyHasSuffixFileToDest(
  resolveFile("configs", "compile", "types"),
  resolveFile("build"),
  ".d.ts"
);
handlePackageJsonFile();

console.log("正在打包cjs库文件...");
execNodeModulesBin(
  `rollup --config ${resolveFile(
    "configs",
    "rollup.config.build.ts"
  )} --configPlugin typescript`
);

console.info("正在打包现代浏览器可用js库...");
execNodeModulesBin(
  `rollup --config ${resolveFile(
    "configs",
    "rollup.config.build.browser.ts"
  )} --configPlugin typescript`
);

console.info("正在打包IE浏览器可用js库...");
const ie8JsContent = path.join(
  distDir,
  "dist",
  packageInfo.libName + ".ie.min.js"
);
const srcJsContent = fs.readFileSync(ie8JsContent);
const targetJsContent = replaceIeNotSupportText(srcJsContent.toString("utf8"));
fs.writeFileSync(ie8JsContent, targetJsContent);

console.info("正在生成typescript文档...");
// execNodeModulesBin(
//   `typedoc --tsconfig ${resolveFile(
//     "configs",
//     "tsconfig.json"
//   )} --out ${docsDir} ${resolveFile("src")}`
// );

const dTsFilesPath = resolveFile("build", "types");
const fileList = fs
  .readdirSync(dTsFilesPath)
  .map((v) => path.join(dTsFilesPath, v));

execNodeModulesBin(
  `typedoc --out ${docsDir} ${resolveFile(
    "build",
    "index.d.ts"
  )} ${fileList.join(" ")}`
);

console.log("正在拷贝字体文件...");
const destFontsDir = path.join(distDir, "fonts");
fs.mkdirSync(destFontsDir);
copyFile(
  resolveFile("fonts", "iconfont.eot"),
  path.join(destFontsDir, "icon.eot")
);
copyFile(
  resolveFile("fonts", "iconfont.ttf"),
  path.join(destFontsDir, "icon.ttf")
);
copyFile(
  resolveFile("fonts", "iconfont.woff"),
  path.join(destFontsDir, "icon.woff")
);
copyFile(
  resolveFile("fonts", "iconfont.woff2"),
  path.join(destFontsDir, "icon.woff2")
);
copyFile(
  resolveFile("fonts", "iconfont.svg"),
  path.join(destFontsDir, "icon.svg")
);

console.log("正在创建示例程序...");
fs.mkdirSync(path.join(distDir, "example"));
const exampleHtmlStr = fs
  .readFileSync(resolveFile("configs", "compile", "example.html"))
  .toString();

fs.mkdirSync(path.join(distDir, "example", "default"));
fs.writeFileSync(
  path.join(distDir, "example", "default", "index.html"),
  exampleHtmlStr.replace(/\$\{jsFileName\}/g, packageInfo.libName + ".min.js")
);
fs.mkdirSync(path.join(distDir, "example", "ie"));
fs.writeFileSync(
  path.join(distDir, "example", "ie", "index.html"),
  exampleHtmlStr.replace(
    /\$\{jsFileName\}/g,
    packageInfo.libName + ".ie.min.js"
  )
);

console.info("正在清除资源...");
deleteFolder(path.join(distDir, "dist", "lib"));
deleteFolder(path.join(distDir, "dist", "types"));
console.log("打包完成时间: ", new Date().toString());
