import { Component, OnInit } from '@angular/core';

import { ResourcesBaseComponent } from '../resources-base.component';
import { ModalUploadImageService, DoctorService } from './../../services';
import { Doctor } from './../../models/doctor.model';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent extends ResourcesBaseComponent<Doctor> implements OnInit {

  get doctors() {
    return this.items;
  }

  constructor(
    doctorService: DoctorService,
    modalUploadImageService: ModalUploadImageService
  ) {
    super(doctorService, modalUploadImageService);
  }

  ngOnInit() {
    this.load();
  }

  delete(doctor: Doctor) {
    super.delete(doctor, `You will delete to ${ doctor.name }`);
  }

  openUploadImageModal(doctor: Doctor) {
    super.openUploadImageModal({ type: 'doctor', id: doctor._id, img: doctor.avatar });
  }

}
