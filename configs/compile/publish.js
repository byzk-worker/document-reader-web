const { execCommand, resolveFile, handlePackageJsonFile } = require("./utils");
const fs = require("fs");

const buildDirPath = resolveFile("build");
try {
  const stat = fs.statSync(buildDirPath);
  if (stat.isFile()) {
    throw new Error();
  }
} catch (e) {
  require("./index");
}
handlePackageJsonFile();
// execCommand("npm", ["login"]);
console.log("开始推送...");
execCommand("npm", ["publish"], { cwd: buildDirPath, env: process.env });
