import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styles: []
})
export class GraphComponent implements OnInit {
  graphs: any = {
    'graph1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'caption': 'El pan se come con'
    },
    'graph2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'caption': 'Entrevistados'
    },
    'graph3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'caption': '¿Le dan gases los frijoles?'
    },
    'graph4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'caption': '¿Le importa que le den gases?'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
