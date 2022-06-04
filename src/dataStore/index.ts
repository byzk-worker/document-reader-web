export class DataStore {
  private _dataStore: any = {};

  public get<T>(key: any): T {
    return this._dataStore[key];
  }

  public set(key: any, val: any): void {
    this._dataStore[key] = val;
  }

  public remove(key: any): void {
    delete this._dataStore[key];
  }

  public all(): any {
    return this._dataStore;
  }
}

export const defaultDataStore = new DataStore();
