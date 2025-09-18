import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightOverDUE'
})
export class HighlightOverDUEPipe implements PipeTransform {

  transform(dueDate: Date | string): string {
    const today = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < today ? 'overdue' : '';
  }


}
