import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { API } from './../../config/index';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

const SEARCH_API = `${ API }/search/general`;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public http: HttpClient,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.search(params['term']));
  }

  search(term: string) {
    this.http.get(`${ SEARCH_API }/${ term }`)
      .subscribe((results: any) => {
        this.users = results.users;
        this.hospitals = results.hospitals;
        this.doctors = results.doctors;
      });
  }
}
