import { Component, Input } from '@angular/core';
import { DisplayTable } from '../../../inventoryextraction/services/extraction.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
})
export class ListComponent { 
@Input() item: string;
@Input() unit: string;
}
