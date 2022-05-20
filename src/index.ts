import { AppImpl } from "./AppImpl";
import { AppConstructor } from "./types";
import "./icon.css";
import "./base.css";

export const App: AppConstructor = AppImpl;

export * from "./types";
export * from "./ui/defaults/default";
