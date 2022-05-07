import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMinutesToHours',
})
export class ConvertMinutesToHoursPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = value % 60;
    const hours = Math.floor(value / 60);
    if (hours === 0) {
      return `${minutes}m`;
    } else if (hours !== 0 && minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }
}
