import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private key = 'settings';

  theme = {
    url: `assets/css/colors/default.css`,
    name: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.load();
  }

  load() {
    const _theme = localStorage.getItem(`${ this.key }-theme`);
    if (_theme) {
      this.theme = JSON.parse(_theme);
    }
    this.apply(this.theme.name);
  }

  save() {
    localStorage.setItem(`${ this.key }-theme`, JSON.stringify(this.theme));
  }

  apply(theme) {
    this.theme = {
      url: `assets/css/colors/${ theme }.css`,
      name: theme
    };
    this.save();
    this._document
      .getElementById('theme')
      .setAttribute('href', this.theme.url);
  }

  isTheme(theme) {
    return this.theme.name === theme;
  }
}
