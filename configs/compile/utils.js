const fs = require("fs");
const crossSpwan = require("cross-spawn");
const node_modules = require("node_modules-path");
const { exit } = require("process");
const path = require("path");

const ieCompatible = `(function(){var origDefineProperty=Object.defineProperty,arePropertyDescriptorsSupported=function(){var r={};try{for(var e in origDefineProperty(r,"x",{enumerable:!1,value:r}),r)return!1;return r.x===r}catch(r){return!1}},supportsDescriptors=origDefineProperty&&arePropertyDescriptorsSupported();supportsDescriptors||(Object.defineProperty=function(r,e,t){if(origDefineProperty&&1==r.nodeType)return origDefineProperty(r,e,t);r[e]=t.value||t.get&&t.get()});})();`;
const ieReplaceContent = {
  //   '["catch"](': /\.catch\(/g,
  //   '["then"](': /\.then\(/g,
  //   '["default"](': /\.default\(/g,
  //   '["class"](': /\.class\(/g,
  //   'r["throw"]': /r\.throw/g,
  //   'r["return"]': /r\.return/g,
  //   ',"throw":': /,throw\:/g,
  //   ',"return":': /,return\:/g,
  //   ',"for":': /,for\:/g,
  //   '["for"].': /\.for\./g,
  //   '["for"]=': /\.for\=/g,
  //   '["for"],': /\.for,/g,
  //   '["for"]|': /\.for\|/g,
  //   '["for"]?': /\.for\?/g,
  //   '["for"]&': /\.for&/g,
  //   ',"else":': /,else\:/g,
  //   '["else"].': /\.else\./g,
  //   '["else"]=': /\.else\=/g,
  //   '["else"],': /\.else,/g,
  //   '["else"]|': /\.else\|/g,
  //   '["else"]?': /\.else\?/g,
  //   '["else"]&': /\.else\&/g,
  //   ',"class":': /,class\:/g,
  //   '["class"].': /\.class\./g,
  //   '["class"]=': /\.class\=/g,
  //   '["class"],': /\.class,/g,
  //   '["class"]|': /\.class\|/g,
  //   '["class"]?': /\.class\?/g,
  //   ',"if":': /,if\:/g,
  //   '["if"].': /\.if\./g,
  //   '["if"]=': /\.if\=/g,
  //   '["if"],': /\.if,/g,
  //   '["if"]|': /\.if\|/g,
  //   '["if"]?': /\.if\?/g,
  // ...ieReplaceContentCreateByKeywords("catch"),
  // ...ieReplaceContentCreateByKeywords("default"),
  // ...ieReplaceContentCreateByKeywords("class"),
  // ...ieReplaceContentCreateByKeywords("else"),
  // ...ieReplaceContentCreateByKeywords("if"),
  // ...ieReplaceContentCreateByKeywords("for"),
  // ...ieReplaceContentCreateByKeywords("is"),
};
const resolveFile = function (...filePath) {
  return path.join(__dirname, "..", "..", ...filePath);
};

const ieImportOtherJs = [
  path.join(node_modules(), "es6-promise", "dist", "es6-promise.min.js"),
  path.join(node_modules(), "es6-promise", "dist", "es6-promise.auto.min.js"),
  resolveFile("configs", "compile", "ieExtends.js"),
];

function ieReplaceContentCreateByKeywords(keyWords) {
  return {
    [`,"${keyWords}":`]: new RegExp(`,${keyWords}\\:`, "g"),
    [`["${keyWords}"].`]: new RegExp(`\\.${keyWords}\\.`, "g"),
    [`["${keyWords}"]=`]: new RegExp(`\\.${keyWords}\\=`, "g"),
    [`["${keyWords}"],`]: new RegExp(`\\.${keyWords}\\,`, "g"),
    [`["${keyWords}"]|`]: new RegExp(`\\.${keyWords}\\|`, "g"),
    [`["${keyWords}"]?`]: new RegExp(`\\.${keyWords}\\?`, "g"),
    [`["${keyWords}"](`]: new RegExp(`\\.${keyWords}\\(`, "g"),
    [`["${keyWords}"])`]: new RegExp(`\\.${keyWords}\\)`, "g"),
    [`["${keyWords}"]&`]: new RegExp(`\\.${keyWords}\\&`, "g"),
  };
}

function deleteFolder(filePath) {
  const files = [];
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => {
      const nextFilePath = `${filePath}/${file}`;
      const states = fs.statSync(nextFilePath);
      if (states.isDirectory()) {
        //recurse
        deleteFolder(nextFilePath);
      } else {
        //delete file
        fs.unlinkSync(nextFilePath);
      }
    });
    fs.rmdirSync(filePath);
  }
}

function execNodeModulesBin(cmd = "", cwd = "") {
  const cmdSplit = cmd.split(" ");
  if (cmdSplit.length < 1) {
    console.error("缺失执行命令");
    exit(1);
  }

  const binPath = path.join(node_modules(), ".bin", cmdSplit.splice(0, 1)[0]);
  const options = { stdio: "inherit" };
  if (cwd !== "") {
    options.cwd = cwd;
  }
  const result = crossSpwan.sync(binPath, cmdSplit, options);
  if (result.error) {
    console.error(`命令[${cmd}]执行失败`);
    exit(result.status);
  }
}

function execCommand(cmd, args, options) {
  if (!options) {
    options = {};
  }

  options.stdio = "inherit";
  const result = crossSpwan.sync(cmd, args, options);
  if (result.error) {
    console.error(`命令[${cmd}]执行失败`);
    exit(result.status);
  }
}

function replaceIeNotSupportText(text = "") {
  for (let i = 0; i < ieImportOtherJs.length; i++) {
    const jsPath = ieImportOtherJs[i];
    let jsConetent = fs.readFileSync(jsPath).toString();
    if (!jsConetent.endsWith(";")) {
      jsConetent += ";";
    }
    text = jsConetent + text;
  }

  for (let k in ieReplaceContent) {
    const v = ieReplaceContent[k];
    text = text.replace(v, k);
  }
  text = ieCompatible + text;

  return text;
}

function copyFile(src, dest) {
  const srcBytes = fs.readFileSync(src);

  try {
    fs.mkdirSync(path.dirname(dest));
  } catch (e) {}
  fs.writeFileSync(dest, srcBytes);
}

function copyHasSuffixFileToDest(src, dest, suffix) {
  const srcStat = fs.statSync(src);
  if (!srcStat.isDirectory() && !srcStat.isFile()) {
    console.error(`源文件[${src}]读取失败`);
    exit(1);
  }

  if (srcStat.isDirectory()) {
    const dirList = fs.readdirSync(src);
    try {
      fs.mkdirSync(dest);
    } catch (e) {}
    for (let i = 0; i < dirList.length; i++) {
      const v = dirList[i];
      copyHasSuffixFileToDest(path.join(src, v), path.join(dest, v), suffix);
    }
    return;
  }
  if (!src.endsWith(suffix)) {
    return;
  }
  copyFile(src, dest);
}

function handlePackageJsonFile() {
  const envJson = require("../../.env.json");
  const registry = envJson.registry || "https://registry.npmjs.org/";

  const packageInfo = require("../../package.json");
  packageInfo.publishConfig = {
    registry,
    access: "public",
  };
  delete packageInfo.devDependencies;
  delete packageInfo.scripts;

  const packageJson = resolveFile("build", "package.json");
  fs.writeFileSync(packageJson, JSON.stringify(packageInfo, null, 2));
}

module.exports = {
  resolveFile,
  deleteFolder,
  execNodeModulesBin,
  replaceIeNotSupportText,
  copyFile,
  copyHasSuffixFileToDest,
  execCommand,
  handlePackageJsonFile,
};
