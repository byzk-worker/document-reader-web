import { DataStore, defaultDataStore } from "../../dataStore";
import { AppInterface } from "../../types";
import { createId } from "../id";
import { Component } from "san";

let _appMap: { [key: string]: AppInterface } = {};

export function registryApp(app: AppInterface): string {
  const appId = createId();
  _appMap[appId] = app;
  return appId;
}

export function unRegistryApp(id: string): void {
  delete _appMap[id];
}

export function getAppBySanComponent(component: Component) {
  return getApp(component.data.get("appId"));
}

export function getApp(id: string): AppInterface {
  return _appMap[id];
}

export function getAppDataStore(id: string): DataStore {
  const app = getApp(id);
  if (!app) {
    return defaultDataStore;
  }
  return (app as any).getDataStore();
}
