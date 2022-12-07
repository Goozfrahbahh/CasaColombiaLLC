import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, OnInit, Output, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateRange, MatCalendar, MatCalendarCellClassFunction, MatMonthView } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';

import { DailyTotals } from '../../shared/models/dailytotals';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYYMMDD',
  },

  display: {
    dateInput: 'DD/MM/YYYY',

    monthYearLabel: 'MMMM YYYY',

    dateA11yLabel: 'LL',

    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export interface dateList<T> {
  T: string[] | number[];
}

@Component({
  selector: 'datepicker',
  templateUrl: './inventorydatepicker.component.html',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.inventoryextractor, div', [
          style({ opacity: 0, transform: 'translateX(+100px)' }),
          stagger(10, [animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))]),
        ]),
      ]),
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [animate('150ms ease-out', style({ opacity: 1, width: '*' }))]),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        query(':leave', [stagger(50, [animate('300ms ease-out', style({ opacity: 0, width: '0px' }))])]),
      ]),
    ]),
  ],
})
export class InventoryDatePickerComponent implements OnInit {
  calendar: MatCalendar<Moment>;
  _startDate: any;
  _endDate: any;
  private format = 'YYYYMMDD';
  private format2 = 'MM/DD/YY';
  date1: any;
  date2: any;

  @HostBinding('@pageAnimations')
  public animatePage = true;

  formatDate(date: any) {
    return moment(date).format(this.format);
  }
  formatDate2(date: any) {
    return moment(date).format(this.format2);
  }
  @ViewChild('currentDate', { static: false })
  currentDate: MatMonthView<moment.Moment>;
  @ViewChild('nextDate', { static: false })
  @Output()
  dateList = new EventEmitter<any>();
  nextDate: MatMonthView<moment.Moment>;

  range = {
    start: moment().endOf('month').subtract(1, 'week'),
    end: moment().endOf('month').add(1, 'week'),
  };

  dateRange = new DateRange(this.range.start, this.range.end);

  currentMonthSubject: BehaviorSubject<any> = new BehaviorSubject<any>(moment().startOf('month'));

  currentMonth = this.currentMonthSubject.asObservable();

  currentMonthVal: any;
  currentMonthDisplay: any;

  nextMonthSubject: BehaviorSubject<any> = new BehaviorSubject<any>(moment().startOf('month').add(1, 'month'));

  nextMonth = this.nextMonthSubject.asObservable();
  nextMonthDisplay: any;
  dailyTotal: DailyTotals;
  dailyTotals: DailyTotals[] = [];
  activeDay: number;
  activeDays: number[];
  datelist: any[];

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: 'month' | 'year' | 'multi-year') => {
    if (view === 'month') {
      const date = cellDate.getDate();
      this.activeDays.forEach((date) => {
        return date === date ? 'available' : 'noinput';
      });
    }
    return this.activeDays;
  };
  private readonly destroy$ = new Subject<void>();

  constructor(
    public _dateAdapter: DateAdapter<Moment> //     private DTservice: DailyTotalsService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 62);

    this.currentMonthDisplay = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    this.nextMonthDisplay = future.toLocaleDateString('en-us', {
      month: 'long',
    });
  }

  ngAfterViewInit(): void {}

  getNextMonthDisplay(): string {
    const today = new Date();
    const future = new Date();

    future.setDate(today.getDate() + 31);

    this.nextMonthDisplay = future.toLocaleDateString('en-us', {
      month: 'long',
    });
    return this.nextMonthDisplay;
  }

  // Next month
  setNextMonth() {
    const today = new Date();
    let future = new Date();
    future.setDate(today.getDate() + 31);
    this.nextDate.activeDate = this.nextMonthSubject.getValue().add(1, 'month');
    this.currentDate.activeDate = this.currentMonthSubject.getValue().add(1, 'month');
  }
  //previous month
  setPreviousMonth() {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 31);
    this.nextDate.activeDate = this.nextMonthSubject.getValue().subtract(1, 'month');
    this.currentDate.activeDate = this.currentMonthSubject.getValue().subtract(1, 'month');
  }

  //On Selected Date Change//
  selectedChange(date: moment.Moment): void {
    //console.log(date);

    if (!this._startDate) {
      this._startDate = date;
      console.log('b');
    } else if (!this._endDate && this._dateAdapter.compareDate(date, this._startDate) >= 0) {
      this._endDate = date;
    } else {
      this._startDate = date;
      this._endDate = null;
    }

    this.dateRange = new DateRange(this._startDate, this._endDate);
    if (this.dateRange.start) {
      this.date1 = this.dateRange.start.toDate;
    }
    if (this.dateRange.end) {
      this.date2 = this.dateRange.end.toDate;
    }
  }
  onSubmitDateRange(): any {
    this.dateRange = new DateRange(this._startDate, this._endDate);

    const start = this.dateRange.start;
    const end = this.dateRange.end;

    console.log(start);
    console.log(end);
    if (end && start) {
      let s = start.days();
      let e = end.days();
      const length = Math.abs(s - e);
    }

    if (start) {
      let id = Number(start.format(this.format));
      console.log(id);
      // this.getDailyTotal( id );
      console.log(this.dailyTotal);
    }

    if (start && end && end < start) {
      console.log(start);
      return start.format(this.format);
    }

    if (start && end && start < end && end && start) {
      console.log(end.format(this.format));
      let a = [start.format(this.format), end.format(this.format)];
      console.log(a);
      this.datelist = [];
      for (let i = start; i < end; i = i.add(1, 'day')) {
        this.datelist.push(i.format(this.format));
      }
      console.log(this.datelist);
      this.dateList.emit(this.datelist);
      return this.datelist;
    }
  }

  getServiceValues(): number | number[] | undefined {
    const start = this.dateRange.start;
    const end = this.dateRange.end;
    if (start && !end) {
      return [start.month(), start.day()];
    }
    if (end && start) {
      return start.month();
    }

    return undefined;
  }
}
