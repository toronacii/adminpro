import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styles: []
})
export class RangeComponent implements OnInit {

  @Input() title: string;
  @Input() value: number = 50;
  @ViewChild('input') input: ElementRef;
  @Output() changed: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onChange(value) {
    this.value = this.getValidValue(value);
    this.input.nativeElement.value = this.value;
    this.changed.emit(this.value);
  }

  changeValue(value) {
    this.value = this.getValidValue(this.value + value);
    this.changed.emit(this.value);
    this.input.nativeElement.focus();
  }

  getValidValue(value) {
    if (value >= 100) {
      return 100;
    }
    if (value <= 0) {
      return 0;
    }
    return value;
  }
}
