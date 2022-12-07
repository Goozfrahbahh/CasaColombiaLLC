import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxCsvParserModule } from 'ngx-csv-parser'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MessagesComponent } from './shared/components/messages/messages.component ';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error-auth.interceptor';
import { fakeBackendProvider } from './core/interceptors/fake-backend';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, MessagesComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxCsvParserModule,
    //Share / Core Module's
    HttpClientModule,
    SharedModule,
    // Router Module
    AppRoutingModule,

    //     		provideFirebaseApp(() => initializeApp(environment.firebase)),
    //     		provideFirestore(() => {
    //     			let firestore: Firestore;
    //     			if (environment.useEmulators) {
    //     				// Long polling required for Cypress
    //     				firestore = initializeFirestore(getApp(), {
    //     					experimentalForceLongPolling: true,
    //     				});
    //     				connectFirestoreEmulator(firestore, "localhost", 8080);
    //     			} else {
    //     				firestore = getFirestore();
    //     			}
    //     			return firestore;
    //     		}),
    //     		provideAuth(() => {
    //     			const auth = getAuth();
    //     			if (environment.useEmulators) {
    //     				connectAuthEmulator(auth, "http://localhost:9099", {
    //     					disableWarnings: true,
    //     				});
    //     			}
    //     			return auth;
    //     		}),
    //       provideDatabase(() => getDatabase()),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (_key: any, value: { name: any }) => (typeof value === 'function' ? value.name : value);

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

  