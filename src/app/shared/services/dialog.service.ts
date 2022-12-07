import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({providedIn: 'root'})
export class DailogService {
      constructor() { }


      confirm(message?: string): Observable<boolean>  {
            const confirmation = window.confirm(message || 'Does this look right')

            return of(confirmation)
      }
      
}