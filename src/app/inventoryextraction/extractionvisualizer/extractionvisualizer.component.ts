import { Component, Input, OnInit } from '@angular/core';

import { csv } from '../services/extraction.service';

@Component({
  selector: 'visualizer',
  template:'extrractionvisualizer.component'
})
export class ExtractionVisualizerComponent implements OnInit {
  @Input() csvRecords: csv[];
  constructor() {}

  ngOnInit() {}
}