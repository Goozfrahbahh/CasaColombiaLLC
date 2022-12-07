import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Items, OptionalParams } from '../../shared/models/inventoryitems';

// import { InventoryService } from

@Component({
  selector: 'visual-organizer',
  templateUrl: 'visualizer.component.html',
})
export class VisualizerComponent implements OnInit {
  url = 'https://api.inventory/v1/items/:id';
  details = '';
  message = '';
  sending = false;
  constructor() {} // private inventoryService: InventoryService

  ngOnInit() {}

  addInventoryItem(
    name: string,
    options?: OptionalParams
  ): Observable<Items[]> | void {
    // change any to item
    // return this.inventoryService,
  }
}
