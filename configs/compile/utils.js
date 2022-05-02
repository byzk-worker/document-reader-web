const fs = require("fs");
const crossSpwan = require("cross-spawn");
const node_modules = require("node_modules-path");
const { exit } = require("process");
const path = require("path");

const ieCompatible = `(function(){var origDefineProperty=Object.defineProperty,arePropertyDescriptorsSupported=function(){var r={};try{for(var e in origDefineProperty(r,"x",{enumerable:!1,value:r}),r)return!1;return r.x===r}catch(r){return!1}},supportsDescriptors=origDefineProperty&&arePropertyDescriptorsSupported();supportsDescriptors||(Object.defineProperty=function(r,e,t){if(origDefineProperty&&1==r.nodeType)return origDefineProperty(r,e,t);r[e]=t.value||t.get&&t.get()});})();`;
const ieReplaceContent = {
  '["catch"](': /\.catch\(/g,
  '["then"](': /\.then\(/g,
  '["default"](': /\.default\(/g,
  '["class"](': /\.class\(/g,
  //   '["throw"](': /\.throw\(/g,
  //   '["throw"]:': /\.throw\:/g,
  //   '["throw"])': /\.throw\)/g,
  'r["throw"]': /r\.throw/g,
  //   '["return"](': /\.return\(/g,
  //   '["return"]:': /\.return\:/g,
  //   '["return"])': /\.return\)/g,
  'r["return"]': /r\.return/g,
  ',"throw":': /,throw\:/g,
  //   '"next":': /next\:/g,
  ',"return":': /,return\:/g,
};
const ieImportOtherJs = [
  path.join(node_modules(), "es6-promise", "dist", "es6-promise.min.js"),
  path.join(node_modules(), "es6-promise", "dist", "es6-promise.auto.min.js"),
];

const resolveFile = function (...filePath) {
  return path.join(__dirname, "..", "..", ...filePath);
};

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

function execNodeModulesBin(cmd = "") {
  const cmdSplit = cmd.split(" ");
  if (cmdSplit.length < 1) {
    console.error("缺失执行命令");
    exit(1);
  }

  const binPath = path.join(node_modules(), ".bin", cmdSplit.splice(0, 1)[0]);
  const result = crossSpwan.sync(binPath, cmdSplit, { stdio: "inherit" });
  if (result.error) {
    console.error(`命令[${cmd}]执行失败`);
    exit(result.status);
  }
}

function replaceIeNotSupportText(text = "") {
  for (let i = 0; i < ieImportOtherJs.length; i++) {
    const jsPath = ieImportOtherJs[i];
    const jsConetent = fs.readFileSync(jsPath).toString();
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

module.exports = {
  resolveFile,
  deleteFolder,
  execNodeModulesBin,
  replaceIeNotSupportText,
};
