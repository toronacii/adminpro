import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadImageService } from '../../services';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  from: number = 0;
  total: number = 0;
  searchTerm$ = new Subject<string>();
  private searchTerm: string = '';

  loading = false;

  constructor(
    private hospitalService: HospitalService,
    private modalUploadImageService: ModalUploadImageService
  ) {
    this.searchTerm$
      .asObservable()
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(searchTerm => {
          this.searchTerm = searchTerm;
          this.from = 0;
        })
      )
      .subscribe(this.load.bind(this));
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    let observable = this.hospitalService.load(this.from);
    if (this.searchTerm.length) {
      observable = this.hospitalService.search(this.from, this.searchTerm);
    }
    observable.subscribe(data => {
        this.loading = false;
        this.total = data.total;
        this.hospitals = data.results;
      });
  }

  paginate(from: number) {
    let _from = this.from + from;
    if (_from < 0 || _from >= this.total) {
      return;
    }
    this.from = _from;
    this.load();
  }

  delete(hospital: Hospital) {
    swal({
      title: 'Are you sure?',
      text: `You will delete to ${ hospital.name }`,
      icon: 'warning',
      buttons: true,
      dangerMode: false
    })
    .then(willDelete => {
      if (willDelete) {
        this.hospitalService
          .delete(hospital._id)
          .subscribe(() => {
            this.from = 0;
            this.load();
          });
      }
    });
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
        return this.hospitalService
          .create(new Hospital(name))
          .subscribe(this.load.bind(this));
      }
    })
    .finally(() => {
      swal.stopLoading();
      swal.close();
    });
  }

  update(hospital: Hospital) {
    this.hospitalService
      .update(hospital)
      .subscribe();
  }

  openUploadImageModal(hospital: Hospital) {
    this.modalUploadImageService
      .open({ type: 'hospital', id: hospital._id, img: hospital.avatar })
      .subscribe(this.load.bind(this));
  }
}
