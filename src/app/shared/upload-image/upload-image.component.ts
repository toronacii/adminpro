import { Component, OnInit } from '@angular/core';
import { ModalUploadImageService } from '../../services';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./styles.css']
})
export class UploadImageComponent implements OnInit {

  file: File;

  constructor(
    public modalUploadImageService: ModalUploadImageService
  ) { }

  ngOnInit() {
  }

  close() {
    this.file = null;
    this.modalUploadImageService.close();
  }

  upload() {
    this.modalUploadImageService
      .upload({ image: this.file })
      .then(() => this.modalUploadImageService.close());
  }

  changeFile(file: File) {
    if (!file || !(file instanceof File)) {
      return;
    }

    if (!file.type.includes('image')) {
      swal('Only Images', 'are allowed', 'error');
      this.file = null;
      return;
    }

    this.file = file;
    this.getFileAsString(fileStr => this.modalUploadImageService.options.img = fileStr);
  }

  getFileAsString(callback) {
    let reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onloadend = () => callback(reader.result);
  }
}
