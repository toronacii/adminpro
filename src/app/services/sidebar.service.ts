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
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', path: '/users' },
        { title: 'Hospitals', path: '/hospitals' },
        { title: 'Doctors', path: '/doctors' },
      ]
    }
  ];

  constructor() { }
}
