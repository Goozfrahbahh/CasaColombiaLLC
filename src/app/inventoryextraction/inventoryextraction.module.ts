import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepicker }  from '@angular/material/datepicker';

import { SharedModule } from '../shared/shared.module';
import { ExtractionVisualizerComponent } from './extractionvisualizer/extractionvisualizer.component';
import { InventoryDatePickerComponent } from './inventorydatepicker/inventorydatepicker.component';
import { ExtractionRouterModule } from './inventoryextraction-router.module';
import { InventoryExtractionComponent } from './inventoryextraction/inventoryextraction.component';
import { ExtractService } from './services/extraction.service';

@NgModule({
  imports: [CommonModule, SharedModule, ExtractionRouterModule ],
  declarations: [InventoryExtractionComponent, ExtractionVisualizerComponent, InventoryDatePickerComponent],
  providers: [ExtractService],
  exports: [InventoryExtractionComponent],
})
export class InventoryExtractionModule {}
