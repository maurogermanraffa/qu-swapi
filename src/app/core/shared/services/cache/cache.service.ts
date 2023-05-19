import { Injectable } from '@angular/core';
import { CacheConstants } from './cache.constants';


@Injectable({
  providedIn: 'root',
})

export class CacheService {
  cache: any;
  defaultLocation = 'Session';
  constants: any;
  constructor() {
    this.constants = CacheConstants;
    this.cache = {};
  }

  forms = new Map<string, any>();

  clearCache() {
    Object.keys(this.constants).forEach((item) => {
      this.cache[item] = null;
      sessionStorage.removeItem(item);
    });
  }

  set(key: string, value: any) {
    const val = this.handleSetObject(value);
    sessionStorage.setItem(key, val);
  }

  get(key: string): any {
    return this.handleGetObject(sessionStorage.getItem(key));
  }


  private handleSetObject(value: any) {
    return encodeURIComponent(JSON.stringify({ value }));
  }

  private handleGetObject(dataRaw: string | null) {
    let data;
    let value;

    if (dataRaw) {
      data = JSON.parse(decodeURIComponent(dataRaw));

      value = data.value;
    }

    return value;
  }
}
