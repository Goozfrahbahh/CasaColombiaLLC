import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Themes } from '../../models/themes';
import { ThemeService } from '../../services/theme.service';

@Component({
	selector: "settings-dialog",
	templateUrl: "settings.component.html",
})
export class SettingsComponent implements OnInit {
          details = '';
          message = '';
          sending = false;
          currentTheme$: Observable<Themes>;

	constructor(private router: Router,
                                  private themeService: ThemeService) {}

	    ngOnInit() {
            this.getSettings();

         }


         getSettings() {
            this.currentTheme$ = this.themeService.getCurrentSettings();
         }

        send() {
                    this.sending = true;
                    this.details = 'Sending Message...';

                    setTimeout(() => {
                        this.sending = false;
                        this.closePopup();
                    }, 1000);
       }

       cancel() {
                     this.closePopup();
        }

         toggleTheme() {
                    this.themeService.toggleSettingsTheme();
                    this.closePopup();

         }

        closePopup() {
            // Provide a 'null' value to the named outlet
            // clears the contents of the name outlet
            this.router.navigate([{ outlets: { popup: null } }]);
        }
}