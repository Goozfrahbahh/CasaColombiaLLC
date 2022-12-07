import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "data-table",
  templateUrl: "./data-table.component.html",
})
export class DataTableComponent implements OnInit {
  @Input() data: any[];

  constructor() {}

  ngOnInit() {}
}
