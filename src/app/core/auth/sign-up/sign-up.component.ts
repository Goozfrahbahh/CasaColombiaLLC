import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html'
})

export class SignUpComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  register() {
    console.log('registered')
  }
}