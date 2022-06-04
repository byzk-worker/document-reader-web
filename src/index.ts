import { AppImpl } from "./AppImpl";
import { AppConstructor } from "./types";
import "./icon.css";
import "./base.css";
import { dom } from "./utils";

// (() => {
//   //防止页面后退
//   history.pushState(null, null, document.URL);
//   dom.eventUtil.addHandler(window, "popstate", function () {
//     history.pushState(null, null, document.URL);
//   });
// })();

export const App: AppConstructor = AppImpl;

export * from "./types";
export * from "./ui/defaults/default";
