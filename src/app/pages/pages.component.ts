import { Component, OnInit } from '@angular/core';

declare function load_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    load_plugins();
  }
}
