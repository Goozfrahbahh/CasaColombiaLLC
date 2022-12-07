import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/interceptors/auth.guard';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { SelectivePreloadingStrategyService } from './shared/services/selectivepreloadingstrategy.service';


const dashboardModule = () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
const inventoryExtractionModule = () => import('./inventoryextraction/inventoryextraction.module').then((m) => m.InventoryExtractionModule)

const coreModule = () => import('./core/core.module').then((m) => m.CoreModule)

const routes: Routes = [
  {
    path: '',
    loadChildren: dashboardModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventoryextraction',
    loadChildren: inventoryExtractionModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: coreModule,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    outlet: 'popup',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
