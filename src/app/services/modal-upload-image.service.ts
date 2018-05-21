import { API } from './../config/index';
import { Injectable, EventEmitter } from '@angular/core';
import { UploadFileService } from './upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadImageService {

  opened = false;
  notifier = new EventEmitter<any>();
  options: any = {};

  constructor(
    private uploadFileService: UploadFileService
  ) { }

  open(options) {
    this.options = options;
    this.opened = true;
    return this.notifier;
  }

  close() {
    this.options = {};
    this.opened = false;
    return this;
  }

  upload(model: any) {
    return this.uploadFileService
      .upload(`${ API }/upload/${ this.options.type }/${ this.options.id }`, model)
      .then(response => {
        swal('Image', 'upload successfully', 'success');
        this.notifier.emit(response);
      })
      .catch(err => this.notifier.emit(err));
  }
}
