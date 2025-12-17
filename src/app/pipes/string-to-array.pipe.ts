import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToArray'
})
export class StringToArrayPipe implements PipeTransform {

  transform(value: string): any {
    if (value && value !== '') {
      return (value.split(',')).map((item) => item.trim());
    }
  }

}
