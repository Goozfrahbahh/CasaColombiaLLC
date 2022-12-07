import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router' 
import { LoginComponent } from './auth/login/login.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { LayoutComponent } from './layout/layout.component'

const accountRoutes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'log-in',
				component: LoginComponent
			},
			{
				path: 'sign-up',
				component: SignUpComponent
			}
		]
	}
]

@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule {   }
