import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: any = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.value;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    this.accountService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
	// get return url from router parameters for default to '/'
	const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	this.router.navigate([returnUrl]);
        },
      });
  }
}
