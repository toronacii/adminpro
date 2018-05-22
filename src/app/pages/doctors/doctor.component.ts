import { ModalUploadImageService } from './../../services/modal-upload-image.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HospitalService, DoctorService } from './../../services';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from './../../models/doctor.model';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  doctor: Doctor;
  hospital: Hospital;
  hospitals: Hospital[] = [];
  isCreate = true;

  constructor(
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private imagePipe: ImagePipe,
    private modalUploadImageService: ModalUploadImageService
  ) { }

  ngOnInit() {
    this.doctor = new Doctor();
    this.doctor.hospital = '';

    this.hospitalService.load(0, Infinity)
      .subscribe(data => this.hospitals = data.results);

    this.activatedRoute.params.subscribe(params => {
      this.isCreate = params['id'] === 'new';

      if (!this.isCreate) {
        this.doctorService.get(params['id'])
          .subscribe((doctor: any) => {
            let hospital = doctor.hospital;
            this.doctor = doctor;
            this.doctor.hospital = hospital._id;
            this.hospital = new Hospital(hospital.name, hospital.avatar, hospital._id);
          });
      }
    });
  }

  pipe(src) {
    return this.imagePipe.transform(src);
  }

  submit(form: NgForm) {
    if (form.valid) {
      if (this.isCreate) {
        this.doctorService.create(form.value)
          .subscribe(doctor => this.router.navigate(['/doctor', doctor._id]));
      } else {
        let doctor = Object.assign({ _id: this.doctor._id }, form.value);
        this.doctorService.update(doctor).subscribe();
      }
    }
  }

  changeHospital(id) {
    this.hospitalService.get(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  openUploadImageModal() {
    this.modalUploadImageService
          .open({ type: 'doctor', id: this.doctor._id, img: this.doctor.avatar })
          .subscribe((doctor: any) => {
            swal('Image upload', 'successfully', 'success');
            this.doctor.avatar = doctor.avatar;
          });
  }

}
