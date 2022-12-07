import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Config } from '../../models/config';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: "[config]",
  templateUrl: "./config.component.html",
})
export class ConfigComponent implements OnInit {
  config: Config | undefined;
  headers: any;
  configSub: Subscription = new Subscription();
  // Subscription: any;
  constructor(private configService: ConfigService) {}

 open$: BehaviorSubject<any> = new BehaviorSubject<any>(closed);

  ngOnInit() {
    // this.Subscription =
    this.showConfigResponse();
  }

  ngOnDestroy() {
    this.configSub.unsubscribe();
  }

  showConfigResponse() {
    this.configSub = this.configService.getResponse().subscribe((resp: any) => {
      const keys = resp.headers.keys();
      this.headers = keys.map(
        (key: string) => `${key}: ${resp.headers.get(key)}`
      );

      // access the body directly, which is typed as `Config`.
      this.config = { ...resp.body! };
    });
  }
}
