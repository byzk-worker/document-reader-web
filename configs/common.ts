const fs = require("fs");
const path = require("path");
const glob = require("glob");

export function postcssFontsBase64(options) {
  // handle options here
  options = options || {};

  // default options
  options.match = options.match || { Scrabble: ["fakefont"] };
  options.format = options.format || ["eot", "woff", "woff2", "ttf"];

  // constiables
  var CWD = path.resolve(process.cwd());

  return function (css, result) {
    // Runs through all of the nodes (declarations) in the css
    css.walkAtRules("font-face", function (fontFace) {
      var fileTypeRegex = getRegexStringForFileTypes(options.format);
      // TODO: Return here if font-family doesn't match options.match
      fontFace.replaceValues(
        // new RegExp('url\\("?.+\\.' + fileTypeRegex + '"?.{0,}\\)', "g"),
        new RegExp(
          `url\\(('|")?.+\\.${fileTypeRegex}\\?{0,}[^']{0,}("|')?\\)`,
          "g"
        ),
        function (attr) {
          var fontSource = attr.replace(/(url|"|\(|\)|\?#iefix)/g, "");
          // TODO: Return here if font filename doesn't match options.match
          var res64 = base64Encode(fontSource);
          var newUrlStr = "url(data:"
            .concat(getMimeType(attr))
            .concat(";charset=utf-8;base64,")
            .concat(res64)
            .concat(")");

          return res64 ? newUrlStr : attr;
        }
      );
    });

    function getRegexStringForFileTypes(fileTypes) {
      var regex = fileTypes
        .map(function (fileType) {
          return fileType === "eot"
            ? fileType.concat("(\\?#iefix)?")
            : fileType;
        })
        .join("|");
      return regex ? "(" + regex + ")" : "";
    }

    // helper functions
    function getMimeType(attribute) {
      var formats = {
        ".woff": "application/font-woff",
        ".woff2": "font/woff2",
        ".ttf": "application/font-sfnt",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-sfnt",
      };

      var match = "";
      var extension = attribute.match(/\.[a-z]{3,4}/)[0];

      if (extension in formats) {
        match = formats[extension];
      }
      return match;
    }

    function base64Encode(file) {
      if (file.startsWith(`"`) || file.startsWith(`'`)) {
        file = file.substring(1);
      }

      if (file.endsWith(`"`) || file.endsWith(`'`)) {
        file = file.substring(0, file.length - 1);
      }

      file = file.split("?")[0];

      if (fs.existsSync(file)) {
        return readAndEncodeFile(file);
      } else {
        // Fallback to glob
        file = glob.sync("**/" + file)[0]; // Could be smarter
        if (fs.existsSync(file)) {
          return readAndEncodeFile(file);
        }

        console.warn(file, "does not exist.");
        return "";
      }
    }

    function readAndEncodeFile(file) {
      var bitmap = fs.readFileSync(file);
      return bitmap.toString("base64");
    }
  };
}
