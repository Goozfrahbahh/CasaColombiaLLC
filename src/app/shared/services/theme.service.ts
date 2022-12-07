import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject } from 'rxjs';

import { Themes } from '../models/themes';

@Injectable({
          providedIn: 'root'
})
export class ThemeService {

theme = 'Dark' ?  'Light' : 'Dark'
themes$: BehaviorSubject<any> = new BehaviorSubject(this.theme)
theme$: Subject<Themes> = new Subject<Themes>();

themes: Themes;


          constructor() { }

          getCurrentSettings() {
                    const theme = this.themes$.pipe(
                              map((result: Themes) => result = result)
                    )
                    return theme
           }

           toggleSettingsTheme(): Observable<Themes> {
                    const change = this.theme$.pipe(
                              distinctUntilChanged()
                    )

                    return change.pipe(map(results  => results = results))
           }


}