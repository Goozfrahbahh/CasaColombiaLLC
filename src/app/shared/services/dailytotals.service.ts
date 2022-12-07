import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { DailyTotals } from '../models/dailytotals';
import { LoggerService } from './logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ServiceNameService {
  //Http Request with url and Dailytotals return values model
  dailyTotals: DailyTotals[] = [];
  url = 'localhost:4200/dailytotals';

  // setting uip the component display first
  monthDays: number;
  month: number;
  range: {
    start: number;
    end: number;
  };

  // id and state identification
  id: number;
  fullResync = false ? true : false;

  // Reactive observable and Subjects instances
  dailytotals$: BehaviorSubject<DailyTotals[]> = new BehaviorSubject<DailyTotals[]>([]);
  resync$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dailie$ = this.dailytotals$.asObservable();

  constructor(private http: HttpClient, private logger: LoggerService) {}

  ngOnInit(): void {
    [this.month, this.monthDays] = this.getMonthInfo();
    this.fullResync = false;
    this.getDailyTotals(this.month, this.monthDays);
  }

  /**GET request special any ranige of time
             * @params ranige id -> id, will grab if needed the range of months and filter results
            // */
  getRange(...months: number[]): Observable<DailyTotals[]> {
    const url = `${this.url} + '/' +${months}.json`;
    return this.http.get<DailyTotals[]>(url, httpOptions).pipe(
      map((result) => (this.dailyTotals = result)),
      tap((arr) => this.log(`message: ${arr}`)),
      catchError(this.handleError<DailyTotals[]>('Get Range'))
    );
  }

  /**
   * GET dailytotals month get request
   * starts when page gets init, used for date range's in concurrent month
   * @params id, the id from YYYYMMDD
   */
  getDailyTotals(month: number, monthDays: number): Observable<DailyTotals> {
    const url = this.url + '/' + month;

    return this.http.get<DailyTotals>(url, httpOptions).pipe(
      map((res: DailyTotals) => (res = res)),
      tap((result) => this.log(`result = ${result}`)),
      catchError(this.handleError<DailyTotals>('Get DailyTotals'))
    );
  }

  /**
   * @params Id, the id  form of YYYYMMDD as a number id for the day
   * */
  // Local Store will contain values from what certain days have results already
  storeLocalStorage() {
    const entry = localStorage.setItem(`${this.id}`, 'dailytotals');

    const entry$ = of(entry);

    return entry$;
  }

  /**
   * Get from local storage// primarly happens at the start to be able to highlilght days on the calendar
   *  Check the local storage make sure  it is in sync, if it falls out of sync and fails to recorn a recync takes place
   *
   * result is typically a boolean
   *
   */

  retreiveLocalStorages(): Observable<boolean> | string {
    let entry: boolean = false;

    const v1 = localStorage.getItem(`${this.id}`);

    if (!entry) {
      const sync = localStorage.getItem('fullsync');
      alert('A full re-sync is  required'), (this.fullResync = true);

      this.syncCurrentMonth();
      const result = 'full sync successfull';
      return result;
    } else {
      !entry === entry;
    }

    return entry;
  }

  /**
   *        Handle Http operation that failed.
   *            Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.add(message);
  }

  // a) Sync Month

  syncCurrentMonth(): Observable<DailyTotals> {
    const month = Number(localStorage.getItem('month'));
    const monthDays = Number(localStorage.getItem('monthDays'));

    const currrentMonthSync = this.getDailyTotals(month, monthDays);

    return currrentMonthSync;
  }

  /// Get Month Info for the current month
  getMonthInfo(): [month: number, monthDays: number] {
    let date = new Date();
    let month = Number(date.getMonth());
    let year = date.getFullYear();
    let monthDays = Number(new Date(year, month));
    let day = Number(date.getDay());
    let daysLeft = Number(monthDays - day);
    if (daysLeft <= 1) {
      return [month, monthDays];
    }

    localStorage.setItem('currentMonth', `${month}`);
    localStorage.setItem('daysleft', `${daysLeft}`);

    return [month, monthDays];
  }

  getLastLogIn() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let monthDays = Number(new Date(year, month));
    let m: number = Number(date.getMonth());
    let d: number = Number(date.getDay());

    const m2 = Number(localStorage.getItem('currentMonth'));
    const d2 = Number(localStorage.getItem('daysleft'));

    if (m2 === m) {
      if (d === d2) {
        return 'no days inbetween';
      } else {
        const same: number = monthDays - d2;

        return Number(Number(d) - Number(same));
      }
    }
    return 'New User Detected';
  }
}
