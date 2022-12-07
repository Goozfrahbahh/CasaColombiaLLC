import { Injectable } from '@angular/core';

export interface msgType {
  1: 'message';
  2: 'error';
  3: 'warning';
  4: 'Info';
  5: 'success';
  6: 'debug';
}

@Injectable({
      providedIn: 'root'
})
export class LoggerService {
  logs: any[] = [];

  constructor(private logger: LoggerService) {}

  localLogs: any[] = [];
  result = 'success';
  logCount: number;

  ngOnInit() {
    this.addCounter();
  }

  /** Log Counter * reset *increment
   *
   * @params logCount
   */
  addCounter() {
    this.logCount = this.logCount + 1;
    if (this.logCount > 5) {
      this.writeLogsLedger();
      localStorage.setItem('count', '0');
    } else {
      localStorage.setItem('count', `${this.logCount}`);
    }
  }

  /** Local Log Actions
   *
   * @params message
   * @param localLogs
   * @params logs
   *
   */
  add(message: string) {
    this.localLogs.push(message);
  }

  clear() {
    this.logs.length = 0;
    this.localLogs.length = 0;
  }

  /** Ledger Actions
   * @param localLogs
   * @param logs
   *
   */
  writeLogsLedger() {
    this.logs.push(this.localLogs);
  }

  clearLogsLedger() {
    this.localLogs = this.logs = [];
  }
}
