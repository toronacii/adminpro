import { Component, OnInit } from '@angular/core';

declare function load_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./style.css']
})
export class NopagefoundComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    load_plugins();
  }

}
