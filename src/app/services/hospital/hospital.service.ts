import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from './../user/user.service';
import { Page } from '../../models/page.model';
import { Hospital } from '../../models/hospital.model';
import { API } from '../../config';

const HOSPITAL_URL = `${API}/hospitals`;
const SEARCH_HOSPITAL_URL = `${API}/search/hospitals`;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  load(from: number): Observable<Page<Hospital>> {
    return this.http.get(`${HOSPITAL_URL}?limit=5&offset=${from}`) as any;
  }

  create(name: string) {
    return this.http.post(`${ HOSPITAL_URL }?token=${ this.userService.token }`, { name })
      .pipe(
        tap(() => swal('Hospital Created', 'Hospital created successfully!', 'success'))
      );
  }

  update(hospital: Hospital) {
    return this.http.put(`${ HOSPITAL_URL }/${ hospital._id }?token=${ this.userService.token }`, hospital)
    .pipe(
      tap(() => swal('Hospital Updated', 'Hospital updated successfully!', 'success'))
    );
  }

  get(id: string) {
    return this.http.get(`${HOSPITAL_URL}/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${HOSPITAL_URL}/${id}?token=${ this.userService.token }`);
  }

  search(from: number, searchTerm: string): Observable<Page<Hospital>> {
    return this.http.get(
      `${SEARCH_HOSPITAL_URL}/${searchTerm}?token=${ this.userService.token }&limit=5&offset=${from}`
    ) as any;
  }
}
