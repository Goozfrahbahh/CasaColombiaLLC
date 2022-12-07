import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartsComponent } from './charts/charts.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule, NgxChartsModule, DashboardRoutingModule],
  declarations: [DashboardComponent, ChartsComponent],
  exports: [DashboardComponent, ChartsComponent],
})
export class DashboardModule {}
