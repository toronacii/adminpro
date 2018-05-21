import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { API } from '../../config';
import { Hospital } from '../../models/hospital.model';
import { ResourceBaseService } from './../resource-base.service';
import { UserService } from './../user/user.service';


const HOSPITAL_URL = `${API}/hospitals`;
const SEARCH_HOSPITAL_URL = `${API}/search/hospitals`;

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends ResourceBaseService<Hospital> {
  constructor(
    http: HttpClient,
    userService: UserService
  ) {
    super(http, HOSPITAL_URL, SEARCH_HOSPITAL_URL, () => userService.token);
  }

  create(hospital: Hospital) {
    return super.create(hospital)
      .pipe(
        tap(() => swal('Hospital Created', 'Hospital created successfully!', 'success'))
      );
  }

  update(hospital: Hospital) {
    return super.update(hospital)
    .pipe(
      tap(() => swal('Hospital Updated', 'Hospital updated successfully!', 'success'))
    );
  }
}
