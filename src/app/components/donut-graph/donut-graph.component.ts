import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styles: []
})
export class DonutGraphComponent implements OnInit {
  @Input() caption: string;
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  constructor() { }

  ngOnInit() {
  }

}
