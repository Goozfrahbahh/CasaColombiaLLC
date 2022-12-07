import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, tap } from "rxjs";

import { MessageService } from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({ providedIn: "root" })
export class UploaderService {
  uploadingFile: any;
  uploadedList: any;

  url = "http//api.localhost:4200";

  constructor(
    private http: HttpClient,
    private router: Router,
    private message: MessageService
  ) {}

  getUploadedList(): Observable<any> {
    const url = this.url;
    return this.http.get(url, httpOptions).pipe(
      tap((_) => this.log(`retreived ${_}`)),
      catchError(
        this.handleError("getUploadedList", `could not download list ${url}`)
      )
    );
  }

  // ----Handle Error---- //
  /**
   *
   * @param operation
   * @param result
   *
   *
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string): void {
    this.message.add(`Uploader: ${message}`);
  }
}
