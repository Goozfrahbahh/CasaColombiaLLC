import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, catchError, throwError } from 'rxjs'
import { AccountService } from '../services/account.service';


@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
          constructor(private accountService: AccountService) { }

          intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                    const error = new Error('test');
                    return next.handle(request).pipe(catchError(err => {
                              if([401, 403].includes(err.status)) {
                                        this.accountService.logout();
                              }
 
                              const error = err.error.message || err.statusText;
                              return throwError(() => error);
                    }))
          }

}


