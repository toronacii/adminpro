import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  upload(url: string, model: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let fieldName = Object.keys(model)[0];
      let file = model[fieldName];

      if (file instanceof File) {
        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        formData.append(fieldName, file, file.name);

        xhr.onreadystatechange = () => {

          if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = xhr.response && JSON.parse(xhr.response);
            if (xhr.status === 200) {
              return resolve(response);
            }
            return reject(response);
          }
        };

        xhr.open('PUT', url, true);
        xhr.send(formData);

      } else {
        reject('Must send file in model');
      }
    });
  }
}
