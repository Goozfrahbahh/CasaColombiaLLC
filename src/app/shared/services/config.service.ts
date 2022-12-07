import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from '../models/config';

@Injectable({ providedIn: "root" })
export class ConfigService {
  configUrl = "https//apikey.com/config";
  constructor(private http: HttpClient) {}

  getResponse() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl);
  }
  // Example this could be done on all request, post, put, get, delete
}
