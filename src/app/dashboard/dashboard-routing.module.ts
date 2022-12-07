import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const dashRoutes: Routes = [
   {
          path: '', 
          component: DashboardComponent,
   }
]

@NgModule({
   imports: [
    RouterModule.forChild(dashRoutes)
   ],
    exports: [RouterModule],
})
export class DashboardRoutingModule {  }

