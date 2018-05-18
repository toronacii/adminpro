import { Pipe, PipeTransform } from '@angular/core';
import { API } from './../config/index';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(url: string, args?: any): any {
    if (!url) {
      return 'assets/images/no-image.png';
    }
    if (url.includes('data:image')) {
      return url;
    }
    if (!url.includes('http')) {
      return `${ API }/${ url }`;
    }
    return url;
  }
}
