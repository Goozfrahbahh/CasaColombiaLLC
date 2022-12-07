import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { DataTableComponent } from './components/datatables/data-table.component';
import { LogComponent } from './components/log/log.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ClickOutsideDirective } from './directives/clickoutside.directive';
import { ObserveVisibilityDirective } from './directives/observability.directive';
import { WebViewDirective } from './directives/webview.directive';
import { ListComponent } from './components/list/list.component';

const ExportComponents = [
      DataTableComponent,
      SettingsComponent,
      LogComponent,
      ListComponent
]
const ExportDirectives = [
      WebViewDirective,
      ClickOutsideDirective,
      ObserveVisibilityDirective
]
const ExportModules = [
      MaterialModule,
      ReactiveFormsModule,
      FormsModule
]

@NgModule({
  imports: [CommonModule, HttpClientModule, ...ExportModules],
  declarations: [...ExportDirectives, ...ExportComponents],
  exports: [
    ...ExportModules,
    ...ExportDirectives, 
    ...ExportComponents
  ],
})
export class SharedModule {}
