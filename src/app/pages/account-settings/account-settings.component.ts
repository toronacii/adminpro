import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SettingsService } from '../../services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  elements: HTMLElement[];

  @ViewChild('themes') themes: ElementRef;
  constructor(private settings: SettingsService) { }

  ngOnInit() {
    this.elements = Array.from(this.themes.nativeElement.getElementsByClassName('selector'));
    this.elements.forEach(element => {
      const theme = element.getAttribute('data-theme');
      element.addEventListener('click', ev => {
        this.toggleClass(element);
        this.settings.apply(theme);
      });

      if (this.settings.isTheme(theme)) {
        this.toggleClass(element);
      }
    });
  }

  toggleClass(element: HTMLElement) {
    const selected = this.elements.find(e => e.classList.contains('working'));
    if (selected) {
      selected.classList.remove('working');
    }
    element.classList.add('working');
  }
}
