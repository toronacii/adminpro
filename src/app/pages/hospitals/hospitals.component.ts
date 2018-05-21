import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { ResourcesBaseComponent } from '../resources-base.component';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadImageService } from '../../services';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent extends ResourcesBaseComponent<Hospital> implements OnInit {

  get hospitals() {
    return this.items;
  }

  constructor(
    hospitalService: HospitalService,
    modalUploadImageService: ModalUploadImageService
  ) {
    super(hospitalService, modalUploadImageService);
  }

  ngOnInit() {
    this.load();
  }

  delete(hospital: Hospital) {
    super.delete(hospital, `You will delete to ${ hospital.name }`);
  }

  create() {
    swal({
      text: 'Name of hospital',
      content: 'input',
      button: {
        text: 'Create',
        closeModal: false,
      },
    })
    .then((name: string) => {
      if (name) {
        return super.add(new Hospital(name));
      }
    })
    .finally(() => {
      swal.stopLoading();
      swal.close();
    });
  }

  openUploadImageModal(hospital: Hospital) {
    super.openUploadImageModal({ type: 'hospital', id: hospital._id, img: hospital.avatar });
  }
}
