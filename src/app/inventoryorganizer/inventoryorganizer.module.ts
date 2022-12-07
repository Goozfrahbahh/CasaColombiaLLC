import { NgModule } from '@angular/core';

import { EditorComponent } from './editor/editor.component';
import { InventoryOrganizerRouterModule } from './inventoryorganizer-routing.module';
import { VisualizerComponent } from './visualizer/visualizer.component';

@NgModule({
  imports: [InventoryOrganizerRouterModule],
  exports: [],
  declarations: [
    VisualizerComponent,
    EditorComponent,

  ],
  providers: [],
})
export class InventoryOrganizerModule {}
