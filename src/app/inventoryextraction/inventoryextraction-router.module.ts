import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryDatePickerComponent } from './inventorydatepicker/inventorydatepicker.component';
import { InventoryExtractionComponent } from './inventoryextraction/inventoryextraction.component';

const extractionRoutes: Routes = [
          { path: '', component: InventoryExtractionComponent},
          { path: '', component: InventoryDatePickerComponent}
]

@NgModule ({
          imports: [RouterModule.forChild(extractionRoutes)],
          exports: [RouterModule]
})
export class ExtractionRouterModule { }