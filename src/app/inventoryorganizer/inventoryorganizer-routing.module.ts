import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryExtractionComponent } from '../inventoryextraction/inventoryextraction/inventoryextraction.component';
import { EditorComponent } from './editor/editor.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

const extractRoutes: Routes = [
  { path: '', component: InventoryExtractionComponent },
  { path: 'visualize', component: VisualizerComponent},
  { path: 'editor', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(extractRoutes)],
  exports: [RouterModule],
})
export class InventoryOrganizerRouterModule {}
