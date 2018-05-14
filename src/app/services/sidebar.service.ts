import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Progress Bar', path: '/progress' },
        { title: 'Graph', path: '/graph' },
      ]
    }
  ];

  constructor() { }
}
