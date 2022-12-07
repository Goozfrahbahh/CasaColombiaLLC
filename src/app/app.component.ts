import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { of } from 'rxjs';
import { AccountService } from './core/services/account.service';
import { UserService } from './core/services/user.service';

import { slideInAnimation } from './shared/animations/slide-in.animation';

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
	animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
	status: boolean = false;
	statusLink: boolean = false;
	shadowStatus: boolean = false;
	loading: boolean = false;
	public appPath = "";
	constructor(
		private locationStrategy: LocationStrategy,
		private contexts: ChildrenOutletContexts,
		private accountService: AccountService,
		private userService: UserService,
	) {
		this.appPath = location.origin + this.locationStrategy.getBaseHref();

		console.log(this.appPath);

		this.accountService.user.subscribe(loggedIn =>{
			if (loggedIn) {
				this.loading = true;
			} else if(!loggedIn) {
				this.loading = false;
			}
		})
	}

	ngOnInit(): void { 
		
	}

	getAnimationData() {
		return this.contexts.getContext("primary")?.route?.snapshot?.data?.[
			"animation"
		];
	}



	onMouseEnter() {
		this.statusLink = true;
		this.status = true;
		this.shadowStatus = true;
	}

	onMouseEnter2() {
		this.statusLink = false;
		this.status = false;
		this.shadowStatus = false;
	}

	onMouseOut() {
		this.status = false;
		this.statusLink = false;
		this.shadowStatus = false;
	}

	clickedOutside(): void {
		this.statusLink = false;
		this.status = false;
	}
}
