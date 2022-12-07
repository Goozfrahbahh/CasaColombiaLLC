import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './layout/layout.component';

export const Components = [
	LoginComponent,
	SignUpComponent,
	LayoutComponent
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreRoutingModule,
  ],
  declarations: [
	...Components
  ],
  exports: [
	...Components
  ],
  providers: [],
})
export class CoreModule {} // Core Module for authentication, shared components, shared services

