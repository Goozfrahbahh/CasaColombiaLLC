import { Injectable } from '@angular/core';
import {
  of,
  switchMap,
  distinctUntilChanged,
  map,
  from,
  concatAll,
  Observable,
  concatMap,
  tap,
  takeLast,
  zipAll,
  forkJoin,
  zip,
  mergeMap,
  merge,
  zipWith,
  combineLatestWith,
} from 'rxjs';
export interface DisplayTable {
          entree: string,
          sold: number
}

export interface csv {
  id: string;
  entree: string;
  modifier: string;
  sold: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExtractService {
  uploadDate: string;
  csvnew: csv[] = [];
  csvnew2: any;

  constructor() {}
  //Business Logic

  extractionMethod(csvRecords: any): Observable<any> {
    const csv$ = of(csvRecords);
    //Map the csv columns and stream only those properties in an array of intface csv: csv[]
    const vars = csv$.pipe(
      concatAll(),
      map((result: any) =>
        this.csvnew.push({
          id: result[0],
          entree: result[2],
          modifier: result[3],
          sold: result[5],
        })
      ),
      switchMap((csvnew) => of(this.csvnew)),
      takeLast(1)
    );

    // use stream copy to ensure no mutations
    const csv2 = vars;

    // Split the stream into two distinct parts: FOOD  and FOOD3PD keep sales point location
    const dineIn$: Observable<csv> = csv2.pipe(
      map((result) => result.filter((result) => result.id === 'FOOD')),
      switchMap((results: csv[]) => of(results)),
      concatAll(),
      distinctUntilChanged((p: csv, q: csv) => p.entree === q.entree)
    );

    const takeOut$: Observable<csv> = csv2.pipe(
      map((result) => result.filter((result) => result.id === 'FOOD (3PD)')),
      switchMap((results: csv[]) => of(results)),
      concatAll(),
      distinctUntilChanged((p: csv, q: csv) => p.entree === q.entree)
    );

     // Combine the takout and dinein streams 
    const combine$ = of(takeOut$, dineIn$)

    const combined$ = combine$.pipe(
            zipAll(),
            switchMap(value => of(value)),
            concatAll(),
            tap(value => console.log(value))
            )



      return combined$
  }
}
