import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { API } from '../../config';
import { Doctor } from '../../models/doctor.model';
import { ResourceBaseService } from './../resource-base.service';
import { UserService } from './../user/user.service';


const DOCTOR_URL = `${API}/doctors`;
const SEARCH_DOCTOR_URL = `${API}/search/doctors`;

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends ResourceBaseService<Doctor> {
  constructor(
    http: HttpClient,
    userService: UserService
  ) {
    super(http, DOCTOR_URL, SEARCH_DOCTOR_URL, () => userService.token);
  }

  create(doctor: Doctor) {
    return super.create(doctor)
      .pipe(
        tap(() => swal('Doctor Created', 'Doctor created successfully!', 'success'))
      );
  }

  update(doctor: Doctor) {
    return super.update(doctor)
    .pipe(
      tap(() => swal('Doctor Updated', 'Doctor updated successfully!', 'success'))
    );
  }
}
